(function(){
    let btnAddFolder = document.querySelector("#btnAddFolder");
    let divContainer = document.querySelector("#divContainer");
    let pageTemplates = document.querySelector("#pageTemplates");
    let fid = 0; 
    btnAddFolder.addEventListener("click", function(){
        let fname = prompt("Enter a folder's name");
        if(fname == null){
            return;
        }

        let divFolderTemplate = pageTemplates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate, true);

        let divName = divFolder.querySelector("[purpose = 'name']");

        divName.innerHTML = fname;

        divFolder.setAttribute("fid", ++fid);

        let spandelete = divFolder.querySelector("span[action='delete']");
        spandelete.addEventListener("click",function(){
            alert("Do you really want to delete " + fname + " folder");
            divContainer.removeChild(divFolder);
        })
        divContainer.appendChild(divFolder);
    })


})();