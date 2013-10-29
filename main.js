require.config({
    paths: {
        underscore  : 'libs/underscore',
        backbone    : 'libs/backbone',
        handlebars  : 'libs/handlebars',
        jquery      : 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
        api         : 'api/employees'
    },
    shim:{
        backbone:{
            deps: ["underscore","jquery"],
            exports: "Backbone"
        },
        handlebars:{
            exports: "Handlebars"
        },
        underscore:{
            exports: "_"
        }

    }
});
