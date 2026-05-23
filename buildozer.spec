[app]

title = NexCampus
package.name = nexcampus
package.domain = org.nexcore
source.dir = .
source.include_exts = py,png,jpg,jpeg,gif,svg,html,css,js,json,xml,ttf,woff,woff2
version = 2.1.0
requirements = python3
orientation = landscape
osx.package_name = NexCampus
android.permissions = INTERNET
android.api = 34
android.minapi = 21
android.ndk = 27
p4a.bootstrap = webview
p4a.port = 8080
android.wakelock = True
android.extra_manifest_application_args = --uses-cleartext-traffic
android.window_state = visible
android.entrypoint = main.py

[buildozer]

log_level = 2
warn_on_root = 1
