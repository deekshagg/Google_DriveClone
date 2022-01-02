(function () {
    let btnAddFolder = document.querySelector("#btnAddFolder");
    let divBreadCrumb = document.querySelector("#divBreadCrumb");
    let divContainer = document.querySelector("#divContainer");
    let pageTemplates = document.querySelector("#pageTemplates");
    let folders = [];
    let fid = 0;
    let fjson = localStorage.getItem("data");
    if (fjson != null && fjson.length > 0) {
        folders = JSON.parse(fjson);
    }
    btnAddFolder.addEventListener("click", addFolder);

    function addFolder() {
        let fname = prompt("Enter a folder's name");
        if (fname == null) {
            return;
        }
        fid++;
        addFolderInPage(fname,fid);
        folders.push({
            id: fid,
            name: fname
        });
        persistFoldersToStorage();
    }

    function deleteFolder() {
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose = 'name']");
        let flag = confirm("Do you really want to delete " + divName.innerHTML + " folder");
        if (flag == true) {
            divContainer.removeChild(divFolder);
            let idx = folders.findIndex(f => f.id == parseInt(divFolder.getAttribute("fid")));
            folders.splice(idx, 1);
        }
        persistFoldersToStorage();
    }

    function editFolder() {
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose = 'name']");
        let fname = prompt("Enter the folder name " + divName.innerHTML);
        if (!fname) {
            return;
        }

        divName.innerHTML = fname;
        let folder = folders.find(f => f.id == parseInt(divFolder.getAttribute("fid")));
        folder.name = fname;
        persistFoldersToStorage();
    }

    function addFolderInPage(fname,fid) {
        let divFolderTemplate = pageTemplates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate, true);

        let divName = divFolder.querySelector("[purpose = 'name']");

        divName.innerHTML = fname;

        divFolder.setAttribute("fid", fid);

        let spandelete = divFolder.querySelector("span[action='delete']");
        spandelete.addEventListener("click", deleteFolder)

        let spanedit = divFolder.querySelector("span[action='edit']");
        spanedit.addEventListener("click", editFolder);


        divContainer.appendChild(divFolder);
    }

    function persistFoldersToStorage() {
        // console.log(folders);
        let fjson = JSON.stringify(folders);
        localStorage.setItem("data", fjson);
    }

    function loadFoldersFromStorage(){
        let fjson = localStorage.getItem("data");
        if(!!fjson){
            folders = JSON.parse(fjson);
            folders.forEach(function(f){
                addFolderInPage(f.name,f.id);
            })
        }
    }

    loadFoldersFromStorage();

})();