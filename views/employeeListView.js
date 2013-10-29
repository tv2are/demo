define(['backbone', 'underscore', 'handlebars', 'jquery', 'api'], function(Backbone, _, Handlebars, $, API){
    
    var Employees = {};

    Employees.ItemTemplate = "<p>{{Firstname}} {{Lastname}}</p>";
    Employees.ProfileTemplate = ["<div id='profileText'>",
                                 "<p>{{Firstname}} {{Lastname}}</p><p>Born: {{Born}}</p>",
                                 "<div>",
                                 "Skills:",
                                 "<ul>",
                                 "{{#each Skills}}",
                                 "<li>{{this}}</li>",
                                 "{{/each}}",
                                 "</ul>",
                                 "</div>",
                                 "<p>Phone: {{Phone}}</p>",
                                 "</div>",
                                 "<img src='{{Picture}}' >"].join("\n");

    Employees.Model = Backbone.Model.extend({
        
    });

    Employees.Collection = Backbone.Collection.extend({
        model : Employees.Model
    });

    Employees.ListView = Backbone.View.extend({
        collection : Employees.Collection,
        el: "#employees",
        tagName: "ul",
        initialize: function(){
            this.collection = new Employees.Collection(API.employees); 
            //this.render();
            var self = this;
            _.each(this.collection.models, function(data){
                console.log(data);
                var item = new Employees.ItemView({model: data});
                self.$el.append(item.$el);
            });
        },
    });

    Employees.ItemView = Backbone.View.extend({
        model : Employees.Model,
        tagName: "li",
        template: Employees.ItemTemplate,
        initialize: function(){
            this.render();
        },
        events: {
            "click": "click"
        },
        click: function(){
            var profileView = new Employees.ProfileView({model: this.model});
            $("#profileview").html(profileView.$el);
            $('li').removeClass('active');
            this.$el.addClass('active');
        },
        render: function(){
            console.log("RENDER!!!!");
            var compiledTemplate = Handlebars.compile(this.template);
            console.log("template", compiledTemplate(this.model.toJSON()));
            console.log(this.model.toJSON());
            this.$el.html(compiledTemplate(this.model.toJSON()));
            return this;
        }
    });

    Employees.ProfileView = Backbone.View.extend({
        model: Employees.Model,
        template: Employees.ProfileTemplate,
        initialize: function() {
            this.render();
        },
        render: function (){
            var compiledTemplate = Handlebars.compile(this.template);
            this.$el.html(compiledTemplate(this.model.toJSON()));
        }
    });

    return Employees;

});
