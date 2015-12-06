'use strict';

define(
    [
        'underscore',
        'backbone',
        'gruik/note-editor',
        'gruik/note-viewer',
        'text!template/edit'
    ],
    function (
        _,
        Backbone,
        NoteEditor,
        NoteViewer,
        template
    ) {
        var Edit = Backbone.View.extend({
            template: _.template(template),
            aceEditorInstance: null,
            gruikEditor: null,
            gruikViewer: null,
            events: {
                'input .edit-note-title': 'setTitle'
            },
            initialize: function () {
                this.model.on('change:content', this.renderViewer, this);
            },
            render: function () {
                this.$el.html(
                    this.template({
                    })
                );

                if (_.isNull(this.gruikEditor)) {
                    this.gruikEditor = new NoteEditor({
                        model: this.model,
                        el: document.getElementById('note-editor')
                    });
                }

                if (_.isNull(this.gruikViewer)) {
                    this.gruikViewer = new NoteViewer({
                        model: this.model,
                        el: document.getElementById('note-viewer')
                    });
                }

                this.gruikEditor.render();
                this.gruikViewer.render();

                return this;
            },
            renderViewer: function () {
                this.gruikViewer.render();
            },
            setTitle: function (event) {
                var title = event.target.value;
                this.model.set('title', title);
            }
        });

        return Edit;
    }
);
