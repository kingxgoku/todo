const modeBtn = document.getElementById('mode');
const addTo = document.getElementById('todo');
const listContainer = document.getElementById('list-container');
const listCount = document.getElementById('list-count');
// const itemss = document.querySelectorAll("#list-container .item"); 

let itemsCount = 2;
listCount.innerHTML = itemsCount;

addTo.addEventListener('keypress', (e) => {
    if ((e.key === "Enter" && e.target.value.length > 1)) {
        const item = document.createElement('div');
        item.className = "item flex gap-4 p-3 px-4 border-bottom border-light-subtle";
        item.setAttribute("draggable",true);
        item.innerHTML = `
        <input class="form-check-input rounded-circle" type="checkbox" id="checkboxNoLabel" value="">
        <input type="text" class="form-control border-0 fs-6" placeholder="${e.target.value}" disabled>
        <button class="--btn cross-btn"><i class="bi bi-x-lg"></i></button>
  `;
        
        listContainer.appendChild(item);

        e.target.value = '';
        listCount.innerHTML = itemsCount +=1;
        l_update();
    }
});

listContainer.addEventListener('click', (e) => {
    
    if (e.target.classList.contains('form-check-input')){
        if (e.target.checked) {
            e.target.nextElementSibling.classList.add("text-decoration-line-through");
            e.target.parentElement.setAttribute('data-completed',true);
            // console.log(e.target.parentElement.dataset.completed);
            listCount.innerHTML = itemsCount -= 1;
        }
        else {
            e.target.nextElementSibling.classList.remove("text-decoration-line-through");
            e.target.parentElement.setAttribute('data-completed',false);
            listCount.innerHTML = itemsCount += 1;

        }
    }

    else if(e.target.classList.contains('bi-x-lg')){
        if(e.target.parentElement.previousElementSibling.previousElementSibling.checked){
            e.target.parentElement.parentElement.remove();
            
        }
        else{
            e.target.parentElement.parentElement.remove();
            listCount.innerHTML = itemsCount -= 1;

        }
        // console.log();
    }

});

modeBtn.addEventListener('click', () => {
    if (modeBtn.firstChild.classList.contains('bi-moon-fill')) {
        modeBtn.innerHTML = '<i class="bi bi-brightness-high-fill"></i>'
        document.documentElement.classList.add('dark');
    }
    else {
        document.documentElement.classList.remove('dark');
        modeBtn.innerHTML = '<i class="bi bi-moon-fill"></i>';

    }

});




document.querySelector('#ft-container').addEventListener('click',(e)=>{
    if(e.target.classList.contains('ft-btn')){
        document.querySelectorAll(".ft-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add('active');
    }
});

function completed(){
    document.querySelectorAll('.item').forEach(item=>{
        item.removeAttribute('hidden');
        if(item.dataset.completed != 'true'){
            item.setAttribute("hidden",true);

        }
    });
};

function active(){
    document.querySelectorAll('.item').forEach(item=>{
        item.removeAttribute('hidden');
        if(item.dataset.completed === 'true'){
            item.setAttribute("hidden",true);

        }
    });
}

function listAll(){
    document.querySelectorAll('.item').forEach(item=>{
        item.removeAttribute('hidden');
        });
}

function clearCompleted(){
    document.querySelectorAll('.item').forEach(item=>{
        if(item.dataset.completed === 'true'){
            item.remove();

        }
    });
};

// Drag and drop logic

listContainer.addEventListener('dragover',(e)=>{
    e.preventDefault();
    const afterElement = getDragAfterElements(listContainer,e.clientY);
    const draggableItem = document.querySelector('.dragging');
    if(afterElement == null){
        listContainer.appendChild(draggableItem);

    }
    else{
        listContainer.insertBefore(draggableItem,afterElement)
    }
})



function getDragAfterElements(container,y){
    const draggableElements = [...container.querySelectorAll('.item:not(.dragging)')];

    return draggableElements.reduce((closest, child)=>{
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if(offset < 0 &&  offset > closest.offset){
            return {offset: offset, element:child}
        }
        else{
            return closest;
        }

    },{offset: Number.NEGATIVE_INFINITY}).element
}


function l_update(){
    for (i of listContainer.children){
        i.addEventListener('dragstart',(e)=>{
            e.target.classList.add('dragging');
        });

        i.addEventListener("dragend",(e)=>{
            e.target.classList.remove('dragging');
        })
    }
};

l_update();