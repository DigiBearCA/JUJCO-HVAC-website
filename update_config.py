#!/usr/bin/env python3
"""
JUJCO Site Configuration Synchronizer
Syncs domain, social media links, email, and phone numbers from site.config.json
across all HTML pages and assets/js/site-config.js.
"""

import os
import json
import re

CACHE_FILE = '.site-sync-cache.json'
CONFIG_FILE = 'site.config.json'
JS_CONFIG_FILE = os.path.join('assets', 'js', 'site-config.js')

def load_json(path):
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    config_path = os.path.join(root_dir, CONFIG_FILE)
    cache_path = os.path.join(root_dir, CACHE_FILE)
    js_path = os.path.join(root_dir, JS_CONFIG_FILE)

    if not os.path.exists(config_path):
        print(f"[ERROR] {CONFIG_FILE} not found!")
        return

    new_cfg = load_json(config_path)

    # Defaults / fallback previous state
    default_state = {
        "domain": "https://jujcohvac.com",
        "siteName": "JUJCO Heating & Cooling",
        "email": "info@jujcohvac.com",
        "phone": "(780) 982 2577",
        "phoneRaw": "+17809822577",
        "emergencyPhone": "(780) 982 3377",
        "emergencyPhoneRaw": "+17809823377",
        "social": {
            "facebook": "https://www.facebook.com/jujco.heating.cooling/",
            "instagram": "https://www.instagram.com/jujcohvac",
            "tiktok": "https://www.tiktok.com/@jujcoheatingcooling"
        }
    }

    cache = load_json(cache_path)
    if not cache:
        cache = default_state

    # Clean domain
    target_domain = new_cfg.get('domain', '').strip().rstrip('/')
    if target_domain and not target_domain.startswith('http://') and not target_domain.startswith('https://'):
        target_domain = 'https://' + target_domain
    new_cfg['domain'] = target_domain

    old_domain = cache.get('domain', default_state['domain']).strip().rstrip('/')

    # Detect changes
    changes = []
    
    # 1. Domain
    domain_changed = (target_domain != old_domain)
    if domain_changed:
        changes.append(('domain', old_domain, target_domain))

    # 2. Email
    old_email = cache.get('email', default_state['email']).strip()
    new_email = new_cfg.get('email', old_email).strip()
    email_changed = (new_email != old_email)
    if email_changed:
        changes.append(('email', old_email, new_email))

    # 3. Phone
    old_phone = cache.get('phone', default_state['phone']).strip()
    new_phone = new_cfg.get('phone', old_phone).strip()
    old_phone_raw = cache.get('phoneRaw', default_state['phoneRaw']).strip()
    new_phone_raw = new_cfg.get('phoneRaw', old_phone_raw).strip()
    phone_changed = (new_phone != old_phone or new_phone_raw != old_phone_raw)
    if phone_changed:
        changes.append(('phone', (old_phone, old_phone_raw), (new_phone, new_phone_raw)))

    # 4. Emergency Phone
    old_em = cache.get('emergencyPhone', default_state['emergencyPhone']).strip()
    new_em = new_cfg.get('emergencyPhone', old_em).strip()
    old_em_raw = cache.get('emergencyPhoneRaw', default_state['emergencyPhoneRaw']).strip()
    new_em_raw = new_cfg.get('emergencyPhoneRaw', old_em_raw).strip()
    em_changed = (new_em != old_em or new_em_raw != old_em_raw)
    if em_changed:
        changes.append(('emergencyPhone', (old_em, old_em_raw), (new_em, new_em_raw)))

    # 5. Social Links
    old_social = cache.get('social', default_state['social'])
    new_social = new_cfg.get('social', old_social)

    social_keys = ['facebook', 'instagram', 'tiktok']
    social_changes = {}
    for sk in social_keys:
        old_val = old_social.get(sk, default_state['social'].get(sk, '')).strip()
        new_val = new_social.get(sk, old_val).strip()
        if old_val != new_val:
            social_changes[sk] = (old_val, new_val)
            changes.append((f'social.{sk}', old_val, new_val))

    print("=" * 60)
    print("JUJCO Site Configuration Synchronizer")
    print("=" * 60)
    print(f"Reading {CONFIG_FILE}...")

    if not changes:
        print("\n[NO CHANGES DETECTED] All configuration values match current site files.")
        print("To update, modify any value in site.config.json and run this again.")
        print("=" * 60)
        return

    print("\nDetected changes to synchronize:")
    for key, old_v, new_v in changes:
        print(f"  * {key:18}: {old_v}  -->  {new_v}")

    # Process all HTML files
    html_files = [f for f in os.listdir(root_dir) if f.endswith('.html') and os.path.isfile(os.path.join(root_dir, f))]
    redirect_files = {'blog-2.html', 'blog-3.html', 'blog-details.html'}
    target_files = [f for f in html_files if f not in redirect_files]

    updated_files = 0

    # Compiled patterns
    pattern_og_url = re.compile(r'(<meta\s+property=["\']og:url["\']\s+content=["\'])https?://[^/"\']+(/[^"\']*)?(["\'])')
    pattern_og_img = re.compile(r'(<meta\s+property=["\']og:image(?::secure_url)?["\']\s+content=["\'])https?://[^/"\']+(/assets/img/og-image\.jpg["\'])')
    pattern_tw_img = re.compile(r'(<meta\s+name=["\']twitter:image["\']\s+content=["\'])https?://[^/"\']+(/assets/img/og-image\.jpg["\'])')

    for fname in sorted(target_files):
        fpath = os.path.join(root_dir, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        orig_content = content

        # 1. Apply domain changes
        if domain_changed:
            content = pattern_og_url.sub(lambda m: f"{m.group(1)}{target_domain}{m.group(2) or '/'}{m.group(3)}", content)
            content = pattern_og_img.sub(lambda m: f"{m.group(1)}{target_domain}{m.group(2)}", content)
            content = pattern_tw_img.sub(lambda m: f"{m.group(1)}{target_domain}{m.group(2)}", content)

        # 2. Apply social link changes
        for sk, (old_val, new_val) in social_changes.items():
            if old_val and new_val:
                # Replace with or without trailing slash
                old_val_clean = old_val.rstrip('/')
                new_val_clean = new_val.rstrip('/')
                content = content.replace(f'href="{old_val}"', f'href="{new_val}"')
                content = content.replace(f'href="{old_val_clean}"', f'href="{new_val_clean}"')
                content = content.replace(f'href="{old_val_clean}/"', f'href="{new_val_clean}/"')

        # 3. Apply email changes
        if email_changed:
            content = content.replace(f'mailto:{old_email}', f'mailto:{new_email}')
            content = content.replace(f'>{old_email}<', f'>{new_email}<')

        # 4. Apply phone changes
        if phone_changed:
            content = content.replace(f'tel:{old_phone_raw}', f'tel:{new_phone_raw}')
            content = content.replace(f'tel:{old_phone_raw.replace("+1", "")}', f'tel:{new_phone_raw}')
            if old_phone != new_phone:
                content = content.replace(old_phone, new_phone)

        # 5. Apply emergency phone changes
        if em_changed:
            content = content.replace(f'tel:{old_em_raw}', f'tel:{new_em_raw}')
            content = content.replace(f'tel:{old_em_raw.replace("+1", "")}', f'tel:{new_em_raw}')
            if old_em != new_em:
                content = content.replace(old_em, new_em)

        if content != orig_content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_files += 1

    # Update JS config file
    js_content = f"""/**
 * Site Configuration
 * Central place for domain, contact, and social media links across the site.
 */
window.SITE_CONFIG = {json.dumps(new_cfg, indent=2)};
"""
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js_content)

    # Save cache
    save_json(cache_path, new_cfg)

    print(f"\n[OK] Updated assets/js/site-config.js")
    print(f"[SUCCESS] Synchronized changes across {updated_files} HTML files!")
    print("=" * 60)

if __name__ == '__main__':
    main()

