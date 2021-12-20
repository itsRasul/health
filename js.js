$(function(){
    // selects

    const closeMenuBarBtn = document.querySelector('.menu-icon-close')
    const menu = document.querySelector('#menu');
    const openMenuBarsBtn = document.querySelector('#menu-container .menu-icon');
    const gliderComments = document.querySelector('.glider-comments');
    const categoryBtns = document.querySelectorAll('#available .available--category');
    const categoryItems = document.querySelectorAll('#available .available--category-item');
    const dayBtns = document.querySelectorAll('#available .days-container .list-group-item');
    //set some variables and settings 
    showAllCategoryItems();

    // functions

    function closeMenuBar(){
        menu.classList.remove('menu-slide-right-hidden-js');
    }
    function openMenuBar(){
        menu.classList.add('menu-slide-right-hidden-js')
    }
    function closeMenuBarIfWindowGetBigSize(){
        if(window.innerWidth >= 1200){
            closeMenuBar();
        }
    }
    function whichCategoryBtnClicked(e){
        const categoryBtnClicked = e.target;
        const categoryBtnClickedSection = categoryBtnClicked.innerText;
        // select item hover
        for(let categoryBtn of categoryBtns){
            if(categoryBtn.classList.contains('category-clicked-hover-style-js')){
                categoryBtn.classList.remove("category-clicked-hover-style-js");
                break;
            }
        }
        categoryBtnClicked.classList.add("category-clicked-hover-style-js")
        whichItemCategoryHavaToShow(categoryBtnClicked ,categoryBtnClickedSection);
    }
    function whichItemCategoryHavaToShow(categoryBtnClicked , categoryBtnClickedSection){
        // 1. first hide whole items
        // 2. then search in whole items and see what item data-category-section
        // is matched with categoryBtnClicked
        // 3. then show categoryItem which is matched(display : block)

        // 1 step
        for (let categoryItem of categoryItems){
            categoryItem.parentNode.classList.add("display-none-js");
        }
        //which dayBtn is selected
        let dayBtnIsSelected = null;
        for(let dayBtn of dayBtns){
            if(dayBtn.classList.contains('active')){
                dayBtnIsSelected = dayBtn;
                break;
            }
        }
        // setting for all btn
        if (categoryBtnClickedSection.toLowerCase() == "all".toLowerCase()){
            showAllCategoryItems(dayBtnIsSelected);
        } else { 
            // 2 step
            for (let categoryItem of categoryItems){
                const categoryItemSection = categoryItem.dataset.categorySection.toLowerCase();
                
                // step 3
                if (categoryItemSection == categoryBtnClickedSection.toLowerCase()
                    && dayBtnIsSelected.innerText.toLowerCase() == categoryItem.dataset.dayAvailable.toLowerCase()){
                    categoryItem.parentNode.classList.remove("display-none-js")
                }
            }
        }
    }
    function showAllCategoryItems(dayBtnIsSelected){
        // hover all btn
        categoryBtns[0].classList.add("category-clicked-hover-style-js")
        // which dayBtn is selected ?
        for(let dayBtn of dayBtns){
            if(dayBtn.classList.contains('active')){
                dayBtnIsSelected = dayBtn;
                break;
            }
        }
        for(let categoryItem of categoryItems){
            if(dayBtnIsSelected.innerText.toLowerCase() == categoryItem.dataset.dayAvailable.toLowerCase()){
                categoryItem.parentNode.classList.remove("display-none-js");
            }
        }
    }
    function whatDaySelected(e){
        const dayBtnSelectedElm = e.target;
        const daySelected = dayBtnSelectedElm.innerText.toLowerCase();
        // which category is selected ?!
        for (categoryBtn of categoryBtns){
            if(categoryBtn.classList.contains('category-clicked-hover-style-js')){
                // this category is selected
                var categorySelected = categoryBtn.innerText;
            }
        }
        hoverDayBtnWhichClickedStyle(dayBtnSelectedElm);
        whichItemCategoryHavaToShowDependsOnDays(dayBtnSelectedElm ,daySelected, categorySelected);

    }
    function hoverDayBtnWhichClickedStyle(dayBtnSelectedElm){
        // first remove active class from all day btns
        for (let dayBtn of dayBtns){
            if(dayBtn.classList.contains('active')){
                dayBtn.classList.remove('active');
                break;
            }
        }
        // hover the dayBtn which is clicked
        dayBtnSelectedElm.classList.add('active');
    }
    function whichItemCategoryHavaToShowDependsOnDays(dayBtnSelectedElm ,daySelected, categorySelected){
        //hide whole items
        for (let categoryItem of categoryItems){
            categoryItem.parentNode.classList.add("display-none-js");
        }
        // check which items has to show depends on day selected and category selcted
        for(let categoryItem of categoryItems){
            console.log(categorySelected.toLowerCase());
            if(categoryItem.dataset.dayAvailable.toLowerCase() == daySelected.toLowerCase()
            && (categoryItem.dataset.categorySection.toLowerCase() == categorySelected.toLowerCase()
            || categorySelected.toLowerCase() == "all")){
                // this item is matched with day selected and categoryBtn selected
                // so this is gonna be showed to user
                categoryItem.parentNode.classList.remove('display-none-js')
            }
        }
    }
    // gliderJs setting
    new Glider(gliderComments, {
        slidesToShow : 1,
        slidesToScroll : 1,
        rewind: true,
        scrollLock :true,
        draggable:true,
        arrows : {
            prev : '.glider-prev-comments',
            next : '.glider-next-comments',
        },
        dots : '.dots-comments',
        responsive: [
            {
                // md mood
              breakpoint: 768,
              settings: {
                // Set to `auto` and provide item width to adjust to viewport
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            } , {

                  // lg mood
              breakpoint: 992,
              settings: {
                // Set to `auto` and provide item width to adjust to viewport
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            }
        ]
    })

    // Events

    closeMenuBarBtn.addEventListener('click' , closeMenuBar);
    openMenuBarsBtn.addEventListener('click' , openMenuBar);
    window.addEventListener('resize' , closeMenuBarIfWindowGetBigSize);
    for(let categoryBtn of categoryBtns){
        categoryBtn.addEventListener('click' , whichCategoryBtnClicked);
    }
    for(let dayBtn of dayBtns ){
        dayBtn.addEventListener('click' , whatDaySelected);
    }
})