Validator.isRequired = function(selector){
    return {
        selector,
        test: function(value){
            return value.trim() ? undefined : 'Vui lòng nhập trường này!'
        }
    }
}

Validator.isEmail = function(selector){
    return{
        selector,
        test:function(value){
            var checkEmail =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return checkEmail.test(value) ? undefined : 'Trường này phải là Email!'
        }
    }
}

function Validator(options){
    var selectorRules = {}
    var formElement = document.querySelector(options.form);
    if(formElement){
        options.rules.forEach(function(rule){
            var inputElement = formElement.querySelector(rule.selector)
            var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
            var errorMessage;
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test)
            }
            else{
                selectorRules[rule.selector] = [rule.test];
            }
            if(inputElement){
                inputElement.onblur = function(){
                    var rules = selectorRules[rule.selector]
        
                    for(var i =0;i<rules.length; ++i){
                        errorMessage = rules[i](inputElement.value)
                        if(errorMessage) break;
                    }
                    if(errorMessage){
                        errorElement.innerText = errorMessage;
                        inputElement.parentElement.classList.add('invalid')
                    }
                    inputElement.onfocus = function(){
                        errorElement.innerText = '';
                        inputElement.parentElement.classList.remove('invalid')
                    }
                }
            }
        })
    }
}