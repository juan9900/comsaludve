$(document).ready(function(){
    $('#plan-1').on('click', function(){
        $('#modal-plan-1').modal('show');
    })
    $('#plan-2').on('click', function(){
        $('#modal-plan-2').modal('show');
    })
    $('#plan-3').on('click', function(){
        $('#modal-plan-3').modal('show');
    })
    $('#plan-4').on('click', function(){
        $('#modal-plan-4').modal('show');
    })
})

const alertPlaceholder = $('#liveAlertPlaceholder')
var timerCloseAlert;
// Enviar suscripcion a cotizacion
$('#quotation-form').on('submit',(e) => {
    console.log('hola');
    firstName = $('#firstName').val();
    lastName = $('#lastName').val();
    email = $('#email').val();
    phoneNumber = $('#phoneNumber').val();
    e.preventDefault();
    
    $.ajax({
        type: "POST",
        url: './modules/addQuotation.php',
        data: {
            firstName,
            lastName,
            email,
            phoneNumber,
        },
        dataType: 'json',
        success: (response) => {
            if(response.status === 'success'){
                $('.register-form-container').addClass('d-none');
                $('.user-registered-container').removeClass('d-none');
            }else{
                alert(response.errors,'danger');
                timer = setTimeout(() => {
                    $('#liveAlertPlaceholder').fadeOut(500, function(){
                        $(this).empty().show();
                    })
                },400000)
            }
        },
        error: (error) => {
            console.log('error: ' , error);
        },
      });
})

const alert = (message, type) => {
    let icon;
    switch(type){
        case 'danger':
            icon = `<i class="fa-solid fa-xmark pe-2"></i>`
        break;
        case 'success':
            icon = `<i class="fa-solid fa-check pe-2"></i>`
        break;

    }   
    
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type}  mb-2" role="alert" id="alert">`,
        `   <div class="m-auto w-100">${message.join("<p></p>")}</div>`,
        
        '</div>'
    ].join('')

    // const wrapper = 
    // `<div class="alert alert-${type} alert-dismissible mb-0" role="alert" id="alert">
    //     <div>${icon}
    //         <div>
    //             ${message.forEach(msg => {
    //                 return message
    //             })}
    //         </div>
    //     </div>
    //     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    // </div>`
    
    
    
    if($('#liveAlertPlaceholder').is(':empty')){
        alertPlaceholder.append(wrapper)
    }else{
        //If the event have been saved in less than 3 seconds, then the previous setTimeout will be deleted
        //so the new alert has its own 3 seconds.
        clearTimeout(timer);
        $('#liveAlertPlaceholder').empty();
        alertPlaceholder.append(wrapper);
       
    }

}