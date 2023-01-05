$(function() {
    var aptData, displayData, sortBy, sortDir; 
    sortBy = 'aptDate';
    sortDir = 'desc';
  
    //FUNCTIONS
    function removeApt(aptID) {
      var whichApt = _.find(aptData, function(item) {
        return item.id == aptID;
      });
      aptData = _.without(aptData, whichApt);
      displayData = _.without(displayData, whichApt);
    }
  
    function listAppointments(info) {
  
      if (sortDir === 'asc') {
        info = _.sortBy(info, sortBy);
      } else {
        info = _.sortBy(info, sortBy).reverse()
      }
  

      $('#empList').loadTemplate('appointment-list.html', info, {
        complete: function() {
          $('.emp-delete').on('click', function() {
            $(this).parents('.emp-item').hide(300, function() {
              var whichItem = $(this).attr('id');
              removeApt(whichItem);
              $(this).remove();  
            });
          }); //delete apt
  
          $('[contenteditable]').on('blur', function() {
            var whichID, fieldName, fieldData;
            whichID = Number($(this).parents('.emp-item').attr('id'));
            fieldName = $(this).data('field');
            fieldData = $(this).text();
            aptData[whichID][fieldName] = fieldData;
          }); // contenteditable on blur
  
        } // complete
      }); //load template    
    }
  
    //READ DATA
    $.ajax({
      url: 'https://trg.kooversapp.com/rest/employee/getEmployeeList/cb0001'
    }).done(function(data) {
      aptData = displayData = data;
      listAppointments(displayData);
    }); //ajax loaded
  
    //EVENTS
  
    // click on add appointment
    $('.apt-addheading').on('click',function() {
      $('.card-body').toggle(300);
    }); // click on add appointment
  
    // click on dropdown menu item
    $('.sort-menu .dropdown-item').on('click', function() {
      var sortDropDown = $(this).attr('id');
  
      switch (sortDropDown) {
        case 'sort-firstName':
          $('.sort-by').removeClass('active');
          sortBy = 'firstName';
          break;

        case 'sort-lastName':
          $('.sort-by').removeClass('active');
          sortBy = 'lastName';
          break;

        case 'sort-aptDate':
          $('.sort-by').removeClass('active');
          sortBy = 'aptDate';
          break;
        case 'sort-asc':
          $('.sort-dir').removeClass('active');
          sortDir = 'asc';
          break;
        case 'sort-desc':
          $('.sort-dir').removeClass('active');
          sortDir = 'desc';
          break;
      }
  
      $(this).addClass('active');
      listAppointments(displayData);
    });
  
    // Typed in search box
    $('#SearchApts').keyup(function() {
      var searchText = $(this).val();
  
      displayData = _.filter(aptData, function(item) {
        return (
          item.firstName.toLowerCase().match(searchText.toLowerCase()) || 
          item.lastName.toLowerCase().match(searchText.toLowerCase()) || 
          item.aptNotes.toLowerCase().match(searchText.toLowerCase())       
        )
      }); // filter
  
      listAppointments(displayData);
    }); //keyup on search
  
    $('#aptForm').submit( function(e) {
      var newItem = {};
      e.preventDefault();
  
      newItem.firstName = $('#firstName').val();
      newItem.lastName = $('#lastName').val();
      newItem.aptDate = $('#aptDate').val();
      newItem.empId = $('#empId').val();
      newItem.mobileNum = $('#mobileNum').val();
      newItem.deptName = $('#deptName').val();
      newItem.companyBranchId = $('#companyBranchId').val();
      newItem.aptNotes = $('#aptNotes').val();
  
      aptData.push(newItem);
      listAppointments(displayData);
      $('#aptForm')[0].reset();
      $('.card-body').hide(300);
    }); // Submit Form
  
  }); 


  $(document).ready(function(){
    $('#mobilecheck').hide(); 
  
    var mobileNum_err = true;
   
    $('#mobileNum').keyup(function(){
    mobileNum_check();
    });
    
    function mobileNum_check(){
    
    var mobileNum_val = $('#mobileNum').val();
    
    if(mobileNum_val.length == ''){
    $('#mobilecheck').show();
    $('#mobilecheck').html("**Please Fill the number");
    $('#mobilecheck').focus();
    $('#mobilecheck').css("color","red");
    mobileNum_err = false;
    return false;
    
    }else{
    $('#mobilecheck').hide();
    }
    
    if((mobileNum_val.length < 10 ) || (mobileNum_val.length > 10 ) ){
    $('#mobilecheck').show();
    $('#mobilecheck').html("**Number length must be  10");
    $('#mobilecheck').focus();
    $('#mobilecheck').css("color","red");
    mobileNum_err = false;
    return false;
    
    }else{
    $('#mobilecheck').hide();
    }}
  
    $('btn').click(function(){
      mobileNum_err = true;
      mobileNum_check();
      if((mobileNum_err == true )  ){
      return true;
      }else{
      return false;
      }   
      });
      
      });