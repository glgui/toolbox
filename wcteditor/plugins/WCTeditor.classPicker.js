(function (editor) {

    var addClassChoosing = function (wcte) {

        $.template('classModal', '<div class="wcte-classModal wcte-modal" contenteditable="false">Choose a class: <select class="wcte-classChoices"></select><button>OK</button><a class="remove">Remove</a><a class="cancel">Cancel</a></div>');
        $.template('classChoice', '<option value="${$data}">${$data}</option>');

        // add button to editor (out of pattern)
        wcte.container.find('.wcte-buttons').append('<button title="set container class" class="wcte-btn-classes">classes</button>');


        // show interface to add a class to current selection
        wcte.setClass = function (leftPosition) {
            var applyClass = function (className) {
                wcte.setSelection(elText);

                document.execCommand('formatBlock', null, BLOCK_ELEMENT);

                // get ahold of newly changed block element
                var b = (elText.startContainer ?
				        $(elText.startContainer).closest('p') :
				        $(elText.parentElement()) || $(elText.parentElement()).closest('p'));

                if (b.length) {
                    b[0].className = className;
                }

            };

            var BLOCK_ELEMENT = 'p',
                        elText = wcte.getRange();

            wcte.container.append($.tmpl('classModal'));
            var modal = wcte.container.find('div.wcte-classModal'),
                        classSelect = modal.find('.wcte-classChoices');

            classSelect.append($.tmpl('classChoice', wcte.classChoices));
            modal.css('left', leftPosition);
            modal.find('button').click(function (e) {
                e.preventDefault();
                var className = classSelect.val();
                applyClass(className);

                modal.remove();
                wcte.updateTextarea();
            });
            modal.find('.remove').click(function (e) {
                e.preventDefault();
                applyClass('');
                modal.remove();
                wcte.updateTextarea();
            });
            modal.find('.cancel').click(function (e) {
                e.preventDefault();
                modal.remove();
            });
            return wcte;
        };

        wcte.container.delegate('.wcte-btn-classes', 'click', function (e) {
            var t = $(this);
            wcte.setClass(t.position().left);
            t.addClass('active');
            return false;
        });

        // save reference to button
        wcte.buttons['classes'] = $('button.wcte-btn-classes', wcte.container);

    };

    editor.addClassChooser = function (wcte) {
        if (wcte.classChoices && wcte.classChoices.length > 0) {
            addClassChoosing(wcte);
        }
    };

})(dstar.editor = dstar.editor || {});