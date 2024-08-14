```
 "pkg:check": "npx expo install --check",
  "pkg:fix": "npx expo install --fix",
  "supa:init": "npx supabase init",
  "prebuild": "yarn expo prebuild",
  "eas:build:configure": "eas build:configure",
  "env:to:eas": "eas secret:push --scope project --env-file ./.env",
  "dev:build": "eas build --profile development --platform android",
  "local:build": "eas build --local",
  "local:abuild": "yarn expo run:android --variant debug",
  "link:supa:database": "npx supabase link --project-ref ewrxcusjjavnccrwhvin",
  "gen:supa:types": "npx supabase gen types typescript --linked > src/types/supabase.ts"
```
