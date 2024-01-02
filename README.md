# Using TypeScript, Node.js, and JSON to implement an employee directory website.
## 使用TypeScript、Node.js和JSON來實現一個員工目錄網站。

## 目錄Table of Contents
- [執行指令](#執行指令)
- [json檔案差別與寫法的不同](#json檔案差別與寫法的不同)
- [實作講解 Practical demonstration](#實作講解-Practical-demonstration)
- [SCSS](#SCSS)
- [bootstrap](#bootstrap)

-專案結構樹狀圖<br />
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

## SCSS
步驟 1: 安裝 SCSS 編譯器

    npm install sass

步驟 2: 撰寫 SCSS 文件

步驟 3: 編譯 SCSS 文件為 CSS

    npx sass public/styles.scss public/styles.css

## bootstrap
1.  **`.container`**: 是 Bootstrap 提供的一個類別，用於將內容置於中心化的容器中。
    
2.  **`.mt-5`**: 是 Bootstrap 提供的一個類別，用於添加上邊距（margin-top）。`mt-5` 代表著上邊距為 5 個間距單位。
    
3.  **`.row`**: 用於定義 Bootstrap 的行（row）。
    
4.  **`.col-md-6`**: Bootstrap 的列（column）類別，表示在中等屏幕大小（medium，md）上佔據 6 格（Bootstrap 的 12 格網格系統）。這個 `col-md-6` 類別表示這個列將會佔據一半的寬度。
    
5.  **`.input-group`**: 這是 Bootstrap 的輸入組（input group），用於將輸入元素和按鈕放置在一個群組內。
    
6.  **`.mb-3`**: 表示底部邊距（margin-bottom）為 3 個間距單位。
    
7.  **`.form-control`**: 是 Bootstrap 提供的一個類別，用於設置表單控制元素的樣式，使其具有100%的寬度並且擁有基本的樣式。
    
8.  **`.btn`**: 是 Bootstrap 提供的一個類別，用於設置按鈕的樣式。
    
9.  **`.btn-primary`** 和 **`.btn-secondary`**: 是不同樣式的按鈕。`.btn-primary` 代表主要樣式的按鈕，`.btn-secondary` 則代表次要樣式的按鈕。
    
10.  **`<input type="text">`**: 是一個 HTML 輸入元素，被 Bootstrap 的 `.form-control` 類別所修飾，使其外觀更符合 Bootstrap 的風格。
    
11.  **`class="form-label"`** 是 Bootstrap 提供的類別。**`class="form-select"`** 是 Bootstrap 提供的類別，用於設置下拉式選單的樣式。
    
12.  **`<div>`、`<label>` 和 `<select>`**: 這些也是 HTML 元素，但在這裡被使用了 Bootstrap 的類別來賦予特定的樣式。
