```sh
pnpm prebuild
```

_If not installed_

```sh
brew install openjdk
```

```sh
echo 'export PATH="/usr/local/opt/openjdk/bin:$PATH"' >> ~/.zshrc
```

```sh
echo 'export CPPFLAGS="-I/usr/local/opt/openjdk/include"' >> ~/.zshrc
```

```sh
source ~/.zshrc
```

```sh
cd android && ./gradlew assembleDebug
```

_Locate APK here: android/app/build/outputs/apk/debug/app-debug.apk_
