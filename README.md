
- 專案結構樹狀圖<br />
-TS_ajax <br />
  |- json <br />
  |  |- data.json <br />
  |  |- data2.json <br />
  |- public <br />
  |  |- index.html <br />
  |  |- script.js <br />
  |  |- styles.css <br />
  |  |- TSscript.js <br />
  |- app.js <br />
  |- TSapp.js <br />
  |- TSapp.ts <br />
  |- tsconfig.json <br />
  |- tsconfig_server.json <br />
  |- TSscript.ts <br />

- data請使用json/data2.json。

- package.json

        "dependencies": {
            "@types/express": "^4.17.21",
            "express": "^4.18.2"

使用TypeScript的版本為TSapp.js和TSscript.js，
app.js和script.js為沒有使用TS的版本。

## 執行指令
因為server和Front程式存放在不同的目錄，因此有兩個tsconfig設定檔案，分別設定不同的輸出路徑。

TSapp.ts，專門產生server程式.js的.json

    tsc --project tsconfig_server.json

TSscript.ts，專門產生Front程式.js的.json，輸出的.js會存在public目錄之下。
>"outDir": "./public"                    /* 指定編譯後的 JavaScript 檔案輸出到 'dist' 資料夾。 */

    tsc --project tsconfig.json

Run server

    node TSapp.js

## json檔案差別與寫法的不同
data.json讀取員工json檔，TS原始寫法。

        select.addEventListener("change", function(this: HTMLSelectElement) {
        const selectedId = parseInt(this.value); // 獲取選擇的員工ID
        const selectedEmployee = data.employees.find(emp => emp.id === selectedId); // 在數據中查找選擇的員工

data2.json因為有多companyName和location，因此修改如下。

        data.forEach((company: any) => {
            // 查找選定的員工
            const employee = company.employees.find((emp: any) => emp.id === selectedId);
            if (employee) {
                // 如果找到員工，存儲所在公司和員工信息
                selectedCompany = company;
                selectedEmployee = employee;
                console.log("Company:", company);
                console.log("Employee:", employee);
                foundEmployee = true; // 標記找到員工為真
            }
        });

## 實作講解 Practical demonstration

Main page <br />
![](https://github.com/weitsung50110/Type_script_node.js/blob/main/github_imgs/0.png)

interface 定義介面描述顯示名字的形狀 

        interface NameDisplayer {
          // 介面定義了一個方法 display，該方法接受一個字串參數 name，並且沒有返回值
          display: (name: string) => void;
          // 介面定義了另一個方法 clear，該方法不接受參數，並且沒有返回值
          clear: () => void;
        }
    
![](https://github.com/weitsung50110/Type_script_node.js/blob/main/github_imgs/1.png)

fetch拿到json的console.log <br />
![](https://github.com/weitsung50110/Type_script_node.js/blob/main/github_imgs/2.png)
