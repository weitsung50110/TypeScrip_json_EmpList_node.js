// 定義介面描述顯示名字的形狀
interface NameDisplayer {
    // 介面定義了一個方法 display，該方法接受一個字串參數 name，並且沒有返回值
    display: (name: string) => void;

    // 介面定義了另一個方法 clear，該方法不接受參數，並且沒有返回值
    clear: () => void;
}

// 將介面的形狀應用到名字顯示器
let nameDisplayer: NameDisplayer = {
    display: function(name: string) {
        // 獲取要顯示名字的 HTML 元素
        const nameDisplayElement = document.getElementById("nameDisplay");

        // 確保取得了名字顯示的元素
        if (nameDisplayElement) {
            // 將輸入的名字顯示在網頁上
            nameDisplayElement.innerText = `Hello, ${name}!`;
        }
    },
    clear: function() {
        // 清除名字顯示的 HTML 元素的內容
        const nameDisplayElement = document.getElementById("nameDisplay");
        if (nameDisplayElement) {
            nameDisplayElement.innerText = '';
        }
    }
};

// 監聽按鈕點擊事件
const showButton = document.getElementById("showButton") as HTMLButtonElement;
//當想要訪問可能為空（null 或 undefined）的屬性或調用可能不存在的方法時，可以使用 ? 來確保在變數為空時不會引發錯誤。
showButton?.addEventListener("click", function() {
    // 獲取輸入名字的文本框元素
    const nameInput = document.getElementById("nameInput") as HTMLInputElement;

    // 獲取輸入的名字
    const enteredName = nameInput.value;

    // 使用名字顯示器顯示輸入的名字
    nameDisplayer.display(enteredName);
});

// 清除按鈕點擊事件
const clearButton = document.getElementById("clearButton") as HTMLButtonElement;
clearButton?.addEventListener("click", function() {
    // 清除名字顯示器的顯示
    nameDisplayer.clear();
});

// 從DOMContentLoaded事件開始監聽
document.addEventListener("DOMContentLoaded", () => {
    //const companySelect: HTMLSelectElement = document.getElementById("company-select") as HTMLSelectElement;
    
    const select: HTMLSelectElement = document.getElementById("employee-select") as HTMLSelectElement;
    // 獲取帶有ID為"employee-select"的HTMLSelectElement元素
    
    const detailsContainer: HTMLElement = document.getElementById("employee-details") as HTMLElement;
    // 獲取帶有ID為"employee-details"的HTMLElement元素，用於顯示員工詳細信息
    
    let selectedCompany: any; // 儲存選定的公司信息
    let selectedEmployee: any; // 儲存選定的員工信息
    let foundEmployee: boolean = false; // 標記是否找到員工

    // 載入JSON數據
    fetch("getdata")
        .then(response => { 
            // 檢查網路回應是否正常
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // 解析JSON數據 將收到的回應轉換為JSON格式
        })
        .then((data: any) => {
            // 確認data是否為數組
            if (Array.isArray(data)) {
                data.forEach((company: any) => {
                    // 檢查公司的employees屬性是否為數組
                    if (Array.isArray(company.employees)) {
                        company.employees.forEach((employee: any) => {
                            // 創建並添加選項到下拉列表中
                            const option: HTMLOptionElement = document.createElement("option");
                            option.value = employee.id.toString();
                            option.textContent = `${company.companyName} > ${employee.name}`;
                            select.appendChild(option);
                        });
                    }
                });

                select.addEventListener("change", function(this: HTMLSelectElement) {
                    // 監聽下拉列表的更改事件
                    const selectedId: number = parseInt(this.value);

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

                    if (foundEmployee) {
                        // 如果找到員工，將員工詳細信息顯示在詳細信息容器中
                        detailsContainer.innerHTML = `
                            <h2>Employee Details</h2>
                            <p>ID: ${selectedEmployee.id}</p>
                            <p>Name: ${selectedEmployee.name}</p>
                            <p>Position: ${selectedEmployee.position}</p>
                            <p>Company: ${selectedCompany.companyName}</p>
                            <p>Location: ${selectedCompany.location}</p>`;
                    } else {
                        // 如果未找到選擇的員工，顯示提示信息
                        detailsContainer.innerHTML = "<p>No employee selected</p>";
                    }
                });
            } else {
                throw new Error('Data structure is not as expected');
            }
        })
        .catch(error => {
            // 處理錯誤情況
            console.error("Error fetching JSON:", error);
        });
});
