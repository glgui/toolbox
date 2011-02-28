(function (editor) {

    var addLinkNewWindow = function (wcte) {
        // change link modal template
        $.template('linkModalTemplate', '<div class="wcte-linkModal wcte-modal"><label>URL:<input type="text" value="${href}"/></label><button>OK</button><a>Cancel</a>'
                                       + '<div class="wcte-link-options">'
                                       + '<input type="checkbox" id="wcte-link-newwindow" checked="${checked}" /><label for="wcte-link-newwindow">Opens in New Window</label>'
                                       + '</div></div>');

        // override setLink() function; changes preceded by "new window logic"
        var setLinkOld = wcte.setLink;
        wcte.setLink = function (leftPosition) {
            var that = this,
			    linkText = that.getRange(),
			    href = (linkText.startContainer ?
			    $(linkText.startContainer).closest("a") :
			    $(linkText.parentElement()) || $(linkText.parentElement()).closest("a")).attr("href");
            that.container.append($.tmpl("linkModalTemplate", { href: href }));
            var modal = that.container.find("div.wcte-linkModal");

            // new window logic - was link already target=_blank ?
            var target = (linkText.startContainer ?
			    $(linkText.startContainer).closest("a") :
			    $(linkText.parentElement()) || $(linkText.parentElement()).closest("a")).attr("target");

            var checked = target ? 'checked' : '',
                checkbox = modal.find('#wcte-link-newwindow');

            checkbox.attr('checked', checked);
            // end new window logic

            modal.css("left", leftPosition);
            modal.find("button").click(function (e) {
                e.preventDefault();
                var link = modal.find("input").val();
                that.setSelection(linkText);

                // new window logic - modify href if you want to open in a new window
                checked = checkbox.attr('checked');
                var newWinFlag = '#NewWindow';
                if (checked) {
                    link += newWinFlag;
                }
                // end new window logic
                document.execCommand("createLink", null, (link.indexOf("//") < 0 ? "http://" + link : link));

                // new window logic - find created link by newWinFlag and add target attribute
                var newWinLink = wcte.container.find('a[href$=' + newWinFlag + ']');
                if (newWinLink.length) {
                    newWinLink.attr('target', '_blank')
                    [0].href = newWinLink[0].href.replace(newWinFlag, '');
                }
                // end new window logic

                modal.remove();
                that.updateTextarea();
            });
            modal.find("a").click(function (e) {
                modal.remove();
                return false;
            });
            return that;
        }

    };

    editor.addLinkNewWindow = addLinkNewWindow;

})(dstar.editor = dstar.editor || {});