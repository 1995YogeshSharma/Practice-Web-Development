$(document).ready(function(){
	var items=$('#gallery li'),
	itemsByTags =[];
	items.each(function(i){
		var elem= $(this),
		tags=elem.data('tags').split(',');
		elem.attr('data-id',i);

		$.each(tags,function(key, value){
			value= $.trim(value);

			if(!(value in temsByTags)){
				itemsByTags[value]=[];

			}
			itemsByTags[value].push(elem);

		});

	});
	createList('All Items',items);
	$.each(itemsByTags, function(k,v){
		createList(k,v);
	});
	
});