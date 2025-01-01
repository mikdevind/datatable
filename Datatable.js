/*!DataTable v1.0.0 | (c) Ilman Hendrawan Saputra | MIKDevInd/license */
class DataTable {
    constructor(containerQuery, data) {
        this.containerQuery = containerQuery;
        this.data = [...data.data];
        this.filteredData = [...data.data];
        this.currentPage = 1;
        this.rowsPerPage = 50;
        this.headData = data.head;
        this.sortDirection = {};

        this.init();
    }
    init(){
    let container = document.querySelector(this.containerQuery);
    if (this.filteredData.length > 0) {
        container.innerHTML = `
            <div id="controls" class="controls"></div>
            <table id="dataTable"></table>
            <div class="pagination"><center id="pagination"></center></div>
        `;

        this.generateControls();
        this.updateTable();
    }else{
        container.innerHTML = `<div><center>Data Tidak Tersedia</center></div>`;
    }
}
    generateControls() {
        const controlsContainer = document.querySelector(`${this.containerQuery} .controls`);
        controlsContainer.innerHTML = "";
        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.placeholder = "Search...";
        searchInput.oninput = (e) => this.searchTable(e.target.value);
        const entriesSelect = document.createElement("select");
        [50, 100, 250, 500, 1000].forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = `${value}`;
            entriesSelect.appendChild(option);
        });
        entriesSelect.value = this.rowsPerPage;
        entriesSelect.onchange = (e) => {
            this.rowsPerPage = parseInt(e.target.value, 10);
            this.currentPage = 1;
            this.updateTable();
        };
        const entriesSelectContainer = document.createElement("div");
        entriesSelectContainer.className = "entries-select";
        entriesSelectContainer.appendChild(document.createTextNode("Show entries: "));
        entriesSelectContainer.appendChild(entriesSelect);
        controlsContainer.appendChild(entriesSelectContainer);
        controlsContainer.appendChild(searchInput);
    }

    generateTable(dataSubset) {
        const table = document.querySelector(`${this.containerQuery} #dataTable`);
        table.innerHTML = "";
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        this.headData.forEach(column => {
            const th = document.createElement("th");
            th.textContent = column.name.charAt(0).toUpperCase() + column.name.slice(1);
            const sortIcon = document.createElement("span");
            sortIcon.className = "sort-icon";
            sortIcon.innerHTML = '<i class="fa-solid fa-sort"></i>';
            th.appendChild(sortIcon);
            th.onclick = () => this.sortTable(column.name, sortIcon);
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        const tbody = document.createElement("tbody");
        dataSubset.forEach(item => {
            const row = document.createElement("tr");
            this.headData.forEach(column => {
                const key = column.name;
                const maxStringLength = column.max;
                const td = document.createElement("td");
                td.setAttribute("data-label", key.charAt(0).toUpperCase() + key.slice(1));
                const content = item[key]?.toString() || "";
                if (maxStringLength && content.length > maxStringLength) {
                    td.innerHTML = `${content.slice(0, maxStringLength)}...`;
                    td.setAttribute("title", content);
                } else {
                    td.innerHTML = content;
                }
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
    }

    sortTable(column, sortIcon) {
        const currentDirection = this.sortDirection[column] || "asc";
        const newDirection = currentDirection === "asc" ? "desc" : "asc";
        sortIcon.textContent = newDirection === "asc" ? " ▲" : " ▼";
        this.sortDirection[column] = newDirection;
        this.filteredData.sort((a, b) => {
            if (typeof a[column] === "string") {
                return newDirection === "asc"
                    ? a[column].localeCompare(b[column])
                    : b[column].localeCompare(a[column]);
            }
            return newDirection === "asc" ? a[column] - b[column] : b[column] - a[column];
        });
        this.updateTable();
    }

    searchTable(query) {
        this.filteredData = this.data.filter(item =>
            Object.values(item).some(value =>
                value.toString().toLowerCase().includes(query.toLowerCase())
            )
        );
        this.currentPage = 1;
        this.updateTable();
    }

    paginateData(page, rows) {
        const start = (page - 1) * rows;
        const end = page * rows;
        return this.filteredData.slice(start, end);
    }

    updateTable() {
        const paginatedData = this.paginateData(this.currentPage, this.rowsPerPage);
        this.generateTable(paginatedData);
        this.generatePagination();
    }

    generatePagination() {
        const totalPages = Math.ceil(this.filteredData.length / this.rowsPerPage);
        const paginationContainer = document.querySelector(`${this.containerQuery} #pagination`);
        paginationContainer.innerHTML = "";
        const backButton = document.createElement("button");
        backButton.textContent = "Back";
        backButton.disabled = this.currentPage === 1;
        backButton.onclick = () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updateTable();
            }
        };
        paginationContainer.appendChild(backButton);
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.className = i === this.currentPage ? "active" : "";
            button.onclick = () => {
                this.currentPage = i;
                this.updateTable();
            };
            paginationContainer.appendChild(button);
        }
        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.disabled = this.currentPage === totalPages;
        nextButton.onclick = () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.updateTable();
            }
        };
        paginationContainer.appendChild(nextButton);
    }
}
