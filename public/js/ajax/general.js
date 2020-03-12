// Dropzone.autoDiscover = false; Activate only Dropzone use

class GeneralClass{
  generateDataTable(table,type="NORMAL"){
    switch (type) {
      case 'NORMAL':
          return $(table).DataTable({
            language:{
                "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Ningún dato disponible en esta tabla",
                "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix":    "",
                "sSearch":         "Buscar:",
                "sUrl":            "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
              }
          });
        break;
      case 'EXPORT':
      return $(table).DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ],
        language:{
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
          }
      });
      break;
    }
  }
  sendAjax(url,type,data){
    return new Promise( (resolve,reject) => {
      $.ajax({
        url:url,
        type:type,
        data:data,
        dataType : "JSON",
        success:function(resp){
          resolve(resp);
        },
        error:function(resp){
          reject(resp);
        }
      })
    })
  }

  permalink(name,permalink){
    $('#'+name).on("keyup",function(){
       var cadena =$(this).val();
       var specialChars = `!@#$^&%*()+=-[]\/{}|:<>¿?,."'`;

       for (var i = 0; i < specialChars.length; i++) {
           cadena= cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
       }

       cadena = cadena.toLowerCase();

       cadena = cadena.replace(/ /g,"-");

       cadena = cadena.replace(/á/gi,"a");
       cadena = cadena.replace(/é/gi,"e");
       cadena = cadena.replace(/í/gi,"i");
       cadena = cadena.replace(/ó/gi,"o");
       cadena = cadena.replace(/ú/gi,"u");
       cadena = cadena.replace(/ñ/gi,"n");
       $('#'+permalink).val(cadena);
    });
  }

  generateDropzone(dropzoneElement,urlUpload,urlDelete,type,aceptFiles,arrayApend,nameElement,typeElement,maxFiles=1){
    var myDropzone = new Dropzone(dropzoneElement, {
        url: urlUpload,
        uploadMultiple : true,
        paramName: "file",
        maxFilesize: 15,
        timeout:0,
        maxFiles: maxFiles ,
        parallelUploads : 1,
        addRemoveLinks : true,
        dictResponseError: "No se puede subir esta archivo!",
        autoProcessQueue: true,
        thumbnailWidth: 138,
        thumbnailHeight: 120,
        previewTemplate: '<div class="dz-preview dz-file-preview"><div class="dz-details"><div class="dz-filename"><span data-dz-name style:"font-weight: bold;"></span></div><div class="dz-thumbnail-wrapper"><div class="dz-thumbnail"><img data-dz-thumbnail><div class="dz-success-mark"><i class="fa fa-check-circle-o"></i></div><div class="dz-error-mark"><i class="fa fa-times-circle-o"></i></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div></div></div><div class="progress progress-striped active"><div class="progress-bar progress-bar-success" data-dz-uploadprogress></div></div></div>',
        acceptedFiles:aceptFiles,
        resize: function(file) {
            var info = { srcX: 0, srcY: 0, srcWidth: file.width, srcHeight: file.height },
                srcRatio = file.width / file.height;
            if (file.height > this.options.thumbnailHeight || file.width > this.options.thumbnailWidth) {
                info.trgHeight = this.options.thumbnailHeight;
                info.trgWidth = info.trgHeight * srcRatio;
                if (info.trgWidth > this.options.thumbnailWidth) {
                    info.trgWidth = this.options.thumbnailWidth;
                    info.trgHeight = info.trgWidth / srcRatio;
                }
            } else {
                info.trgHeight = file.height;
                info.trgWidth = file.width;
            }
            return info;
        },
        sending : function(file, xhr, formData){
           for(let i=0;i<arrayApend.length;i++){
              formData.append(arrayApend[i]['name'],arrayApend[i]['value']);
           }
        },
        success: function(file, response){
            var values= response;
            if(values.code=="200"){
                $(".dz-preview").addClass("dz-success");
                $("div.progress").remove();
                file.previewElement.accessKey = values.id;
                if(type=="gallery"){

                }else{
                  $(nameElement).val(values.name);
                }
            }else{
              swal("No se ha podido cargar la imagen");
            }
        },
        removedfile: function(file) {
            //id = file.previewElement.accessKey;
            name = file.previewElement.accessKey;
            $.ajax({
              url:urlDelete,
              type:"post",
              data:{deleteimage:name,type:typeElement},
              dateType:"json",
              success:function(resp){
                $(file.previewElement).remove();
                $(nameElement).val('');
              }
            });
        }
    });
    return myDropzone;
  }

  generateDynamicDropzone(element,arrayApend){
    let elements = $(element);
    for(let dropzone of elements){
      if(!dropzone.classList.contains('dz-clickable')){
        let variable = new Dropzone(dropzone, {
             url: '/dashboard/news/uploadgalery',
             uploadMultiple : true,
             paramName: "file",
             maxFilesize: 15,
             maxFiles: 3 ,
             timeout:0,
             parallelUploads : 1,
             addRemoveLinks : true,
             dictResponseError: "No se puede subir esta archivo!",
             autoProcessQueue: true,
             thumbnailWidth: 138,
             thumbnailHeight: 120,
             previewTemplate: '<div class="dz-preview dz-file-preview"><div class="dz-details"><div class="dz-filename"><span data-dz-name style:"font-weight: bold;"></span></div><div class="dz-thumbnail-wrapper"><div class="dz-thumbnail"><img data-dz-thumbnail><div class="dz-success-mark"><i class="fa fa-check-circle-o"></i></div><div class="dz-error-mark"><i class="fa fa-times-circle-o"></i></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div></div></div><div class="progress progress-striped active"><div class="progress-bar progress-bar-success" data-dz-uploadprogress></div></div></div>',
             acceptedFiles:"image/*",
             resize: function(file) {
                 var info = { srcX: 0, srcY: 0, srcWidth: file.width, srcHeight: file.height },
                     srcRatio = file.width / file.height;
                 if (file.height > this.options.thumbnailHeight || file.width > this.options.thumbnailWidth) {
                     info.trgHeight = this.options.thumbnailHeight;
                     info.trgWidth = info.trgHeight * srcRatio;
                     if (info.trgWidth > this.options.thumbnailWidth) {
                         info.trgWidth = this.options.thumbnailWidth;
                         info.trgHeight = info.trgWidth / srcRatio;
                     }
                 } else {
                     info.trgHeight = file.height;
                     info.trgWidth = file.width;
                 }
                 return info;
             },
             sending : function(file, xhr, formData){
                for(let i=0;i<arrayApend.length;i++){
                   formData.append(arrayApend[i]['name'],arrayApend[i]['value']);
                }
             },
             success: function(file, response){
                 var values= response;
                 if(values.code=="200"){
                     $(".dz-preview").addClass("dz-success");
                     $("div.progress").remove();
                     file.previewElement.accessKey = values.id;
                    //    $('').val(values.name);
                 }else{
                   Swal.fire("No se ha podido cargar la imagen");
                 }
             },
             removedfile: function(file) {
                 //id = file.previewElement.accessKey;
                 name = file.previewElement.accessKey;
                 $.ajax({
                   url:"/dashboard/news/extrasoperations",
                   type:"post",
                   data:{deletegallery:name},
                   dateType:"json",
                   success:function(resp){
                     $(file.previewElement).remove();
                   }
                 });
             }
         });
         let id = $(dropzone).siblings("button").attr("data-id");
         if($('.image_'+id).length > 0){
           $('.image_'+id).each(function(item,element){
             var mockFile = { name: "Click para remover la imagen", size: 12345};
             variable.emit("addedfile",mockFile);
             var image_load="/api/gallery/"+$(this).val();
             variable.element.lastChild.accessKey = $(this).attr("data-id");
             variable.emit("thumbnail", mockFile,image_load);
           });
         }
      }
    }
  }

}
