"use strict";
// 等待DOM加載完成後執行
document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("employee-select"); // 選擇表單元素
    const detailsContainer = document.getElementById("employee-details"); // 員工詳細信息容器
    // 載入JSON數據
    fetch("getdata")
        .then(response => { return response.json(); }) // 將收到的回應轉換為JSON格式
        .then((data) => {
        data.employees.forEach(employee => {
            const option = document.createElement("option"); // 創建一個選項
            option.value = employee.id.toString(); // 設置選項的值為員工的ID
            option.textContent = String(employee.id); // 設置選項的文本內容為員工的名字
            select.appendChild(option); // 將選項添加到選擇表單中
        });
        // 監聽選擇表單的更改事件
        select.addEventListener("change", function () {
            const selectedId = parseInt(this.value); // 獲取選擇的員工ID，將字串轉換為整數 123
            const selectedEmployee = data.employees.find(emp => emp.id === selectedId); // 在數據中查找選擇的員工
            if (selectedEmployee) { // 如果找到了選擇的員工
                // 將該員工的詳細信息顯示在詳細信息容器中
                detailsContainer.innerHTML = `
                        <h2>Employee Details</h2>
                        <p>ID: ${selectedEmployee.id}</p>
                        <p>Name: ${selectedEmployee.name}</p>
                        <p>Position: ${selectedEmployee.position}</p>
                        <p>Department: ${selectedEmployee.department}</p>
                    `;
            }
            else {
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
