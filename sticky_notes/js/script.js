var db= null;

if(window.openDatabase){
    db= openDatabase("NoteTest", "1.0", "sticky_note_database",10000000);
    if(!db)
        alert('Failed to create database');
}
else{
    alert('Your browser does not support HTML5 web storage');
}

function Note()
{
    //var self= this;
    var note= document.createElement("div");
    note.className= 'note';
    note.addEventListener('mousedown',function(a){
        return this.onMouseDown(a);
    }, false);
    note.addEventListener('click', function(a){
        return this.onNoteClick();
    },false);

    this.note= note;

    var close= document.createElement("div");
    close.className= 'closeButton';
    close.addEventListener('click', function(a){
        return this.onCloseClick(a);
    });

    note.appendChild(close);

    var edit= createElement('div');
    edit.className= 'edit';
    edit.setAttribute('contenteditable',false);
    edit.addEventListener('keyup', function(a){
        return this.onKeyUp();
    },false);
    note.appendChild(edit);
    this.editField= edit;

    var ts= document.createElement('div');
    ts.className='timestamp';
    ts.addEventListener('mousedown',function(a){
        return this.onMouseDown(a);
    });
    note.appendChild(ts);
    this.lastModified= ts;

    document.body.appendChild(note);
    return this;
}

Note.prototype= {
    get id(){
        if(!('_id' in this))
            this._id=0;
        return this._id;
    },

    set id(x){
        this._id=x;
    },

    get text(){
        return this.editField.innerHTML;
    },

    set text(x){
        this.editField.innerHTML= x;
    },

    get timestamp()
    {
        if(!('_timestamp' in this))
            this._timestamp=0;
        return this._timestamp;
    },

    set timestamp(x){
        if(this._timestamp==x)
            return;

        this._timestamp= x;
        var date= new Date();
        date.setTime(parseFloat(x));
        this.lastModified.textContent= modifiedString(date);
    },

    get left()
    {
        return this.note.style.left;
    },

    set left(x)
    {
        this.note.style.left= x;
    },

    get top()
    {
        return this.note.style.top;
    },

    set top(x)
    {
        this.note.style.top= x;
    },

    get zIndex()
    {
        return this.note.style.zIndex;
    },

    set zIndex(x)
    {
        this.note.style.zIndex= x;
    },

    close: function(a){
        this.cancelPendingSave();
        var note= this;
        db.transaction(function(tx){
            tx.executeSql("DELETE from MyStickys where id=?", [note.id]);
            document.body.removeChild(this.note);
        });
    }    
}
