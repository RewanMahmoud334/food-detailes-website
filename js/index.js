

let sideBarInnerWidth=$("#sideBarInner").innerWidth()
$("#sideBar").css("left",-sideBarInnerWidth)
$(".close-icon").click(function(){
    if($("#sideBar").css("left")=="0px"){
        $("#sideBar").animate({left:-sideBarInnerWidth},1000)
        $("#sideBarInner li").animate({top:"100%"},1000)
    }else{
        $("#sideBar").animate({left:"0px"},1000)
        $("#sideBarInner li").animate({top:"0"},1000)
    }
     })


     async function getHomeApi(){
        $(".inner-loading-screen").fadeIn(200)
        let Api=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
        homeApi=await Api.json()
        displayHome(homeApi.meals)
        $(".inner-loading-screen").fadeOut(1000)
       }

       getHomeApi()


    

    async function getCategory(){
        $(".inner-loading-screen").fadeIn(200)
      let Api=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      categoryApi=await Api.json()
      displayCategory(categoryApi.categories)
      $(".inner-loading-screen").fadeOut(1000)
     }

     async function getArea(){
        $(".inner-loading-screen").fadeIn(200)
        let Api=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        areaApi=await Api.json()
        displayArea(areaApi.meals)
        $(".inner-loading-screen").fadeOut(1000)
       }

       async function getIngredient(){
        $(".inner-loading-screen").fadeIn(200)
        let Api=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        ingredientApi=await Api.json()
        displayIngredient(ingredientApi.meals.slice(0,25))
        $(".inner-loading-screen").fadeOut(1000)
       }

       async function getFilterCategory(category){
        $(".inner-loading-screen").fadeIn(200)
        let Api=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        filterCatApi=await Api.json()
        filterCategory(filterCatApi.meals)
        $(".inner-loading-screen").fadeOut(1000)
       }
    

       async function getFilterArea(Area){
        $(".inner-loading-screen").fadeIn(200)
        let Api=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
        filterByA=await Api.json()
        filterArea(filterByA.meals)
        $(".inner-loading-screen").fadeOut(1000)
       }

       async function getFilterIngredient(Ingredient){
        $(".inner-loading-screen").fadeIn(200)
        let Api=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`)
        filterByI=await Api.json()
        filterIngredient(filterByI.meals)
        $(".inner-loading-screen").fadeOut(1000)
       }


       async function getSearchByName(term){
        let Api=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        searchApi=await Api.json()
        displaySearchByName(searchApi.meals)
       }

       async function getSearchByLetter(firstLetter){
        let Api=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
        searchLetterApi=await Api.json()
        displaySearchByName(searchLetterApi.meals)
       
       }

       async function getMealDetailes(mealId){
        $(".inner-loading-screen").fadeIn(200)
        let Api=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        detailes=await Api.json()
        displayDetailes(detailes.meals[0])
        $(".inner-loading-screen").fadeOut(1000)
       }



       function displayDetailes(arr){
        var paragraph=``
        for(let i=1;i<=20;i++){
            if (arr[`strIngredient${i}`])
            paragraph+=`
            <li class="btn btn-outline-danger text-white my-3">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>
            `
        }

         let tagsArray=arr.strTags?.split(",");
        
         if (tagsArray==undefined){
            tagsArray=[]
         } 
            let tags=``
            for(let i=0;i<tagsArray.length;i++){
                tags+=`
                <li class="btn btn-outline-danger text-white my-3"> ${tagsArray[i]}</li>
                `
            }
         
         
        


        var cartonaa=`
        <div class="col-md-5">
        <div class="content">
            <figure class="text-center">
                <img src="${detailes.meals[0].strMealThumb}" alt="" class="img-fluid">
                <h3 class="text-white">${detailes.meals[0].strMeal}</h3>
            </figure>
        </div>
    </div>


    <div class="col-md-6">
        <div class="content">
            <h3 class="text-white fs-2">Instructions</h3>
            <p class="text-white visible">${detailes.meals[0].strInstructions}</p>
            <li class="text-white list-unstyled fs-2">Area : <span class="text-white fs-2">${detailes.meals[0].strArea}</span> </li>
            <li class="text-white list-unstyled fs-2">Category : <span class="text-white fs-2">${detailes.meals[0].strCategory}</span></li>
            <li class="text-white list-unstyled fs-2">Recipes : </li>
            <div>
            ${paragraph}
            </div>
            <li  class="text-white list-unstyled fs-2">Tags : </li>
            <div> ${tags} </div>
            <a target="_blank" href="https://www.bbcgoodfood.com/recipes/778642/apple-and-blackberry-crumble" class="btn btn-success">Source</a>
            <a href="${detailes.meals[0].strYoutube}" class="btn btn-danger text-decoration-none text-white">Youtube</a>
        </div>
    </div>
        `

      

        $(".row").html(cartonaa)

       }


    async function displayCategory(arr){
        $(".row").removeClass("d-none")
        $(".search-input").removeClass("d-flex").addClass("d-none")
        let cartoona=``
        for(let i=0;i<arr.length;i++){
            cartoona+=`
            <div class="col-md-3">
            <div class="content">
                <figure>
                    <img src="${categoryApi.categories[i].strCategoryThumb}" class="img-fluid" alt="">
                    <div class="fig-content">
                        <h3>${categoryApi.categories[i].strCategory}</h3>
                     <p>${categoryApi.categories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </figure>
                </div>
        </div>
            `
        }

       

        $(".row").html(cartoona)
        $(".fig-content").click(function(){
          category=$(this).children("h3").html();
          console.log(category)
          getFilterCategory(category)
          })

    }

     async function filterCategory(arr){
        $(".row").removeClass("d-none")
        $(".search-input").removeClass("d-flex").addClass("d-none")
        let cartoona=``
        for(let i=0;i<arr.length;i++){
            cartoona+=`
            <div class="col-md-3">
            <div class="content">
                <figure onclick="getMealDetailes('${filterCatApi.meals[i].idMeal}')">
                    <img src="${filterCatApi.meals[i].strMealThumb}" class="img-fluid" alt="">
                    <div class="fig-content">
                        <h3>${filterCatApi.meals[i].strMeal}</h3>
                    </div>
                </figure>
                </div>
        </div>
            `
        }

        $(".row").html(cartoona)


     }

     async function filterArea(arr){
        $(".row").removeClass("d-none")
        $(".search-input").removeClass("d-flex").addClass("d-none")
        let cartoona=``
        for(let i=0;i<arr.length;i++){
            cartoona+=`
            <div class="col-md-3">
            <div class="content">
                <figure onclick="getMealDetailes('${filterByA.meals[i].idMeal}')">
                    <img src="${filterByA.meals[i].strMealThumb}" class="img-fluid" alt="">
                    <div class="fig-content d-flex align-items-center">
                        <h3>${filterByA.meals[i].strMeal}</h3>
                    </div>
                </figure>
                </div>
        </div>
            `

           
        }

        $(".row").html(cartoona)

     }

     async function filterIngredient(arr){
        $(".row").removeClass("d-none")
        $(".search-input").removeClass("d-flex").addClass("d-none")
        let cartoona=``
        for(let i=0;i<arr.length;i++){
            cartoona+=`
            <div class="col-md-3">
            <div class="content">
                <figure onclick="getMealDetailes('${filterByI.meals[i].idMeal}')">
                    <img src="${filterByI.meals[i].strMealThumb}" class="img-fluid" alt="">
                    <div class="fig-content d-flex align-items-center">
                        <h3>${filterByI.meals[i].strMeal}</h3>
                    </div>
                </figure>
                </div>
        </div>
            `
        }

        $(".row").html(cartoona)


     }

     

     



     async function displayArea(arr){
        $(".row").removeClass("d-none")
        $(".search-input").removeClass("d-flex").addClass("d-none")
        let cartoona=``
        for(let i=0;i<arr.length;i++){
            cartoona+=`
            <div class="col-md-3">
            <div class="content">
                <figure>
                <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                   <p class="text-white visible py-3 fs-4">${areaApi.meals[i].strArea}</p>
                </figure>
                </div>
        </div>
            `
        }

        $(".row").html(cartoona)
        $("figure").click(function(){
            Area=$(this).children("p").html();
            console.log(Area)
            getFilterArea(Area)
            })
     }

     async function displayIngredient(arr){
        $(".row").removeClass("d-none")
        $(".search-input").removeClass("d-flex").addClass("d-none")
        let cartoona=``
        for(let i=0;i<arr.length;i++){
            cartoona+=`
            <div class="col-md-3">
            <div class="content">
                <figure class="text-center">
                   <i class="fa-solid fa-drumstick-bite fa-4x text-white py-2"></i>
                   <h3 class="text-white">${ingredientApi.meals[i].strIngredient}</h3>
                   <p class="text-white visible">${ingredientApi.meals[i].strDescription.split(" ").slice(0,25).join(" ")}</p>
                </figure>
                </div>
        </div>
            `
        }

        $(".row").html(cartoona)
        $("figure").click(function(){
            Ingredient=$(this).children("h3").html();
            console.log(Ingredient)
            getFilterIngredient(Ingredient)
            })
     }


     function displaySearch (){
        $(".search-input").removeClass("d-none").addClass("d-flex")
        $(".search-input .inputName").keyup(function(){
         term=this.value
         console.log(term)
         getSearchByName(term)
        })

        $(".search-input .inputLetter").keyup(function(){
            firstLetter=this.value
            console.log(term)
            getSearchByLetter(firstLetter)
           })
        
 }

 
 function displaySearchByName(arr){
    let cartoona=``
    for(let i=0;i<arr.length;i++){
        cartoona+=`
        <div class="col-md-3">
        <div class="content">
            <figure class="text-center" onclick="getMealDetailes('${arr[i].idMeal}')" >
            <img src="${arr[i].strMealThumb}" class="img-fluid" alt="">
            <div class="fig-content align-items-center d-flex justify-content-center">
                    <h3>${arr[i].strMeal}</h3>
                </div>
            </figure>
            </div>
    </div>
        `
    }

    $(".row").html(cartoona)
   }

   function displayHome(arr){
    $(".row").removeClass("d-none")
    let cartoona=``
    for(let i=0;i<arr.length;i++){
        cartoona+=`
        <div class="col-md-3">
        <div class="content">
            <figure class="text-center"  onclick="getMealDetailes('${homeApi.meals[i].idMeal}')">
            <img src="${arr[i].strMealThumb}" class="img-fluid" alt="">
            <div class="fig-content align-items-center d-flex justify-content-center">
                    <h3>${arr[i].strMeal}</h3>
                </div>
            </figure>
            </div>
    </div>
        `
    }

    $(".row").html(cartoona)
   }


       function displayContact(){
        let cartonaa=`
        <div class="col-md-5 pt-5">
        <div class="content">
         <input id="inputName" type="text" class="form-control mt-5" placeholder="Enter your name">
        </div>
     </div>
     <div class="col-md-5 pt-5">
         <div class="content">
          <input id="inputEmail" type="email" class="form-control mt-5" placeholder="Enter your Email">
         </div>
      </div>
      <div class="col-md-5 mt-2  nameAlert">
      
   </div>
   <div class="col-md-5  mt-2 EmailAlert">
      
   </div>


      
      <div class="col-md-5 mt-2 ">
         <div class="content">
          <input id="inputNumber" type="text" class="form-control mt-2" placeholder="Enter your number">
         </div>
      </div>
      <div class="col-md-5 mt-2 ">
         <div class="content">
          <input id="inputAge" type="number" class="form-control mt-2" placeholder="Enter your age">
         </div>
      </div>
      <div class="col-md-5 mt-2 phoneAlert">
      
      </div>
      <div class="col-md-5 mt-2 ageAlert">
      
      </div>
      <div class="col-md-5 mt-2">
         <div class="content">
          <input id="inputPassword" type="password" class="form-control mt-2" placeholder="Enter your password">
         </div>
      </div>
      <div class="col-md-5  mt-2">
         <div class="content">
          <input id="inputRePassword" type="password" class="form-control mt-2" placeholder="repeat your password">
         </div>
      </div>
      <div class="col-md-5 mt-2  passwordAlert">
      
      </div>
      <div class="col-md-5 mt-2 RepasswordAlert">
      
      </div>
      <div class="col-md-3 mx-auto ">
      <button class="btn btn-outline-danger  mt-3">submit</button>
      </div>
      
        
        `

        $(".row").html(cartonaa);



        $("#inputName").keyup(function(){
            inputName=document.getElementById("inputName")
            if(validateName()==true){
                document.querySelector(".nameAlert").innerHTML=``
            }else{
                document.querySelector(".nameAlert").innerHTML=` 
                <div class="content">
                <button class="name alert alert-danger text-black w-100">at least one caracter , no number or special caracter</button>
                </div>
             `
            }
        })

        $("#inputEmail").keyup(function(){
            inputEmail=document.getElementById("inputEmail")
            if(validateEmail()==true){
                document.querySelector(".EmailAlert").innerHTML=``
            }else{
                document.querySelector(".EmailAlert").innerHTML=` 
                <div class="content">
                <button class="name alert alert-danger text-black w-100">Email not valid -> emaple@yyy.com</button>
                </div>
             `
            }
        })

        $("#inputNumber").keyup(function(){
            inputNumber=document.getElementById("inputNumber")
            if(validateNumber()==true){
                document.querySelector(".phoneAlert").innerHTML=``
            }else{
                document.querySelector(".phoneAlert").innerHTML=` 
                <div class="content">
                <button class="name alert alert-danger text-black w-100">Enter valid phone number</button>
                </div>
             `
            }
        })

        $("#inputAge").keyup(function(){
            inputAge=document.getElementById("inputAge")
            if(validateAge()==true){
                document.querySelector(".ageAlert").innerHTML=``
            }else{
                document.querySelector(".ageAlert").innerHTML=` 
                <div class="content">
                <button class="name alert alert-danger text-black w-100">Enter valid Age</button>
                </div>
             `
            }
        })

        $("#inputPassword").keyup(function(){
            inputpassword=document.getElementById("inputPassword")
            if(validatePassword()==true){
                document.querySelector(".passwordAlert").innerHTML=``
            }else{
                document.querySelector(".passwordAlert").innerHTML=` 
                <div class="content">
                <button class="name alert alert-danger text-black w-100">Minimum eigth caracter , at least one number and at least one leter</button>
                </div>
             `
            }

        })

        $("#inputRePassword").keyup(function(){
            inputRePassword=document.getElementById("inputRePassword")
            if(inputpassword.value==inputRePassword.value){
                document.querySelector(".RepasswordAlert").innerHTML=``
            }else{
                document.querySelector(".RepasswordAlert").innerHTML=` 
                <div class="content">
                <button class="name alert alert-danger text-black w-100">password not match</button>
                </div>
             `
            }
        })

        
   


    
       }

       function validateName(){
        var regex=/^[a-zA-Z]{1,10}$/
        return (regex.test(inputName.value))
       }

       function validateEmail(){
        var regex=/^[a-zA-z]{1,10}@[a-zA-z]{1,10}.[a-zA-z]{3,10}$/
        return (regex.test(inputEmail.value))
       }
       function validateNumber(){
        var regex=/^01[0125][0-9]{8}$/
        return (regex.test(inputNumber.value))
       }
       function validateAge(){
        var regex=/^[1-9]{1,2}$/
        return (regex.test(inputAge.value))
       }
       function validatePassword(){
        var regex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        return (regex.test(inputpassword.value))
       }
     

       $("#Contact").click(function(){
        displayContact();
     })



     $("#Category").click(function(){
        getCategory()
     })

     $("#Area").click(function(){
        getArea()
     })

     $("#Ingredients").click(function(){
        getIngredient()
     })


       $("#Search").click(function(){
        displaySearch()
       })


       $("li").click(function(){
        $("#sideBar").animate({left:-sideBarInnerWidth},1000)
       })




    
       





       





