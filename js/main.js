$(document).ready(function() {

	var list = [];

	function Todo(i){
		this.name =i,
		this.status =false,
		this.id = Date.now()
	}

	function pushList(i,active){

		var className = null;

		if(!active) {className= "class='completed'"};
		i.forEach(function(i){
		$('.items').append(`
			<li>
			    <article ${className} >
			        <button data-id="${i.id}" class='check'></button>
			        <p>${i.name}</p>
			        <input type='text' class='edit-todo' value='learn html'>
			        <button data-id="${i.id}" class='delete'>X</button>
			    </article>
			</li>
		`)
		})
		
	}

	$('form').on("submit",function(e){
		e.preventDefault();

		var content = $('input').val();

		var todo = new Todo(content);

		list.push(todo);

		$('.items').append(`
			<li>
			    <article>
			        <button data-id="${todo.id}" class='check'></button>
			        <p>${content}</p>
			        <input type='text' class='edit-todo' value='learn html'>
			        <button data-id="${todo.id}" class='delete'>X</button>
			    </article>
			</li>
		`)



	})


	$('body').on('click','.delete',function(){
		let id = $(this).data('id');
		list.forEach(function(i){
			if(i.id === id){
				list.splice(list[i],1);
			}
		})
		$(this).parent().parent().remove();


	})

	$('body').on('click','.check',function(){
		let id = $(this).data('id');
		_this = this;
		list.forEach(function(i){
			if(i.id === id){
				if(i.status === false){
					i.status = true;
					$(_this).parent().addClass('completed');
				}else{
					i.status = false;
					$(_this).parent().removeClass('completed');
				}	
			}
		})
	})

	$('.show-all').click(function(){
		var completeList = list.filter(function(i){
				if(i.status === true){
				return i;
			}
		})

		var activeList = list.filter(function(i){
			if(i.status === false){
				return i;
			}
		})

		$('.items').html('');
		pushList(activeList,true);
		pushList(completeList,false);
	})

	$('.show-active').click(function(){
		var activeList = list.filter(function(i){
			if(i.status === false){
				return i;
			}
		})
		$('.items').html('');
		pushList(activeList,true);
	})

	$('.show-completed').click(function(){
		var completeList = list.filter(function(i){
				if(i.status === true){
				return i;
			}
		})
		$('.items').html('');
		pushList(completeList,false);
	})
	
});

