// 等待DOM加載完成後執行
document.addEventListener("DOMContentLoaded", function() {
    //const companySelect = document.getElementById("company-select"); // 選擇公司的表單元素
    const select = document.getElementById("employee-select"); // 選擇表單元素
    const detailsContainer = document.getElementById("employee-details"); // 員工詳細信息容器

    // 載入JSON數據
    fetch("getdata")
        .then(response => { 
            // 檢查網路回應是否正常
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // 解析JSON數據 將收到的回應轉換為JSON格式
        })
        .then(data => {
            
            // 遍歷每個公司的員工並加入選項
            data.forEach(company => {
                company.employees.forEach(employee => {
                    const option = document.createElement("option"); // 創建一個選項
                    option.value = employee.id; // 設置選項的值為員工的ID
                    option.textContent = company.companyName+" > "+employee.name; // 設置選項的文本內容為員工的名字
                    select.appendChild(option); // 將選項添加到選擇表單中
                });
            });

            // 監聽選擇表單的更改事件
            select.addEventListener("change", function() {
                const selectedId = parseInt(this.value); // 獲取選擇的員工ID
                // 尋找選擇的員工並取得所在公司的位置
                data.forEach(company => { //Array.find() 只要一找到相符的直就跳出迴圈
                    const employee = company.employees.find(emp => emp.id === selectedId);// 如果找到了選擇的員工 
                    if (employee) {
                        selectedCompany = company;
                        selectedEmployee = employee;
                        console.log("Company:", company); // 檢查每個公司的資料
                        console.log("Employee:", employee); // 檢查找到的員工
                        foundEmployee = true; // 標記找到員工為真
                    }
                });
                //const selectedEmployee = data.employees.find(emp => emp.id === selectedId); // 在數據中查找選擇的員工
                if (foundEmployee) {
                    // 將該員工的詳細信息顯示在詳細信息容器中
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
        })
        .catch(error => {
            // 處理發生的錯誤
            console.error("Error fetching JSON:", error);
        });
});