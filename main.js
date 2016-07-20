var notes=[],
$headerForm=$('.header-form'),
$notesContainer=$('.note-container'),
$notesTitle=$headerForm.find("input[name='note_title']"),
$notesContent=$headerForm.find("textarea[name='note_content']");
var counter=0;
function appendSingleNote(data){
	var content=data.content;
	var title=data.title;
	var html='<div class="note" id="note'+data.id+'"">'+
				'<button class="note-close" onclick="deleteNote('+data.id+')">x</button>'+
				'<h3 class="note-title">'+title+'</h3>'+
				'<p class="note-content">'+content+
				'</p>'+
			'</div>';
	$notesContainer.append(html);
}
function storeNote(data){
	notes.push(data);
	window.localStorage.setItem('notes',JSON.stringify(notes));
	appendSingleNote(data);
}
function deleteNote(id){
	for(var i=0;i<notes.length;i++){
		if(notes[i].id===id){
			notes.splice(i,1);
			break;
		}
	}
	console.log(notes);
	window.localStorage.setItem('notes',JSON.stringify(notes));
	$('#note'+id).remove();	
}
$headerForm.on('submit',function(e){
	e.preventDefault();
	var data={
		id: counter,
		title: $notesTitle.val(),
		content: $notesContent.val()
	};
	counter++;
	storeNote(data);
});
function init(){
	if(window.localStorage.getItem('notes')){
		notes=JSON.parse(window.localStorage.getItem('notes'));
	}
	else{
		notes=[];
	}
	for(var i=0;i<notes.length;i++){
		counter=Math.max(counter,notes[i].id+1);
		appendSingleNote(notes[i]); 
	}
}
init();