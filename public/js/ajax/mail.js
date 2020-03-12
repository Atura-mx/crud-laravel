/**
 * Si la clase General.js Ya está implementada en el proyecto, omitirla por favor
 */
$(document).ready(function(){

/**
 * Cuando usamos post con ajax en laravel tenemos que mandar token incriptado, así se añade al meta tag
 */
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

/**
 * Event launch form, create and update
 */
    formValidationContact('#new_usew_form','/store',$("#create"));
    formValidationContact('#update_usew_form','/update',$("#update"));

/** Load data and show modal update form */
    $("#update").on("shown.bs.modal", function(e){
        let generalClass = new GeneralClass();
        let uid = $(e.relatedTarget).attr("data-uid");
        generalClass.sendAjax('/edit','post',{'uid':uid}).then((resp, reject) => {
            if(!reject){
                if(resp.code==200){
                    $("#nameInput").val(resp.data.name);
                    $("#emailInput").val(resp.data.email);
                    $("#telephoneInput").val(resp.data.telephone);
                    $("#uid_update").val(resp.data.uid);
                }else{
                    error();
                }
            }else{
                error();
            }
        });
    });

/**
* Reload web site after close modal
*/
    $("#update").on("hidden.bs.modal", function(e){
        window.location.href = "";
    });
    $("#create").on("hidden.bs.modal", function(e){
        window.location.href = "";
    });
     
/**
* Delete register
**/
    $(".delete").on("click",function(e){
        e.preventDefault();
        let uid = $(this).attr("data-uid");
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                let generalClass = new GeneralClass(); // init the clase
                generalClass.sendAjax('/destroy','post',{'uid':uid}).then((resp, reject) => {
                    if(!reject){
                        if(resp.code==200){
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            setTimeout(function(){
                                window.location.href="";
                            },1500);
                        }else{
                            error();
                        }
                    }else{
                        error();
                    }
                });
            }
          })
    });
    
});

/** Execute form and validate, only set selector */
function formValidationContact(id,url,modal){
    let generalClass = new GeneralClass(); // init the clase
    let button = $(id+" button.action_form"); // change button id
    $(id).formValidation({
       framework:"bootstrap",
       icons:{
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
       },

       //locale:"es_ES", delete comment if do you need spanish
       fields:{}
    }).on("success.form.fv",function(e){
      button.attr("disabled");
      button.text("¡Envíando!");
      button.addClass("disabled");
      e.preventDefault();

    /** Class general Class set params (url, method, data ), use Promise */
      generalClass.sendAjax(url,'post',$(id).serialize()).then((resp, reject) => {
        if(!reject){
            if(resp.code==200){
            /* Close modal */
                modal.modal("hide");
            /** End Close Modal */
                Swal.fire({
                    imageUrl: '/images/logo_lord_barber.png',
                    imageHeight: 70,
                    title : '¡Gracias por su confianza!',
                    text : 'En breve un asesor se pondrá en contacto contigo.',
                    imageAlt: 'CRUD',
                    footer: '<a href="https://www.atura.mx">www.atura.mx</a>',
                    showCloseButton: true,
                    showConfirmButton : false
                });
                $(id).data('formValidation').resetForm($(id));
                button.attr("disabled",false);button.removeClass("disabled");button.text("¡Enviar!");
            }else{
                error();
            }
        }else{
            error();
        }
      });
    })
}
 
 /** Send message error */
function error(){
    Swal.fire({
        imageUrl: 'https://www.villabrisatabasco.com/front/images/cropped-Villa-Brisa-logo.png',
        imageHeight: 70,
        title : 'Ha ocurrido un error, intente nuevamente por favor',
        imageAlt: 'Villa Brisa Tabasco',
        footer: '<a href="https://www.villabrisatabasco.com">www.villabrisatabasco.com</a>',
        showCloseButton: true,
        showConfirmButton : false
    });
}