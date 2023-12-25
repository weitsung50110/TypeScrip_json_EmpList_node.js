

## 執行指令
因為server和Front程式存放在不同的目錄，因此有兩個tsconfig設定檔案，分別設定不同的輸出路徑。

TSapp.js，專門產生server程式.js的.json

    tsc --project tsconfig_server.json

TSscript.js，專門產生Front程式.js的.json，輸出的.js會存在public目錄之下。
>"outDir": "./public"                    /* 指定編譯後的 JavaScript 檔案輸出到 'dist' 資料夾。 */

    tsc --project tsconfig.json

Run server

    node TSapp.js
