define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'models/patient',
  'text!templates/patients/new.html'
], function($, _, Backbone, Handlebars, Patient, n) {
	"use strict";
	
	return Backbone.View.extend({
		className: 'col-xs-12 col-md-10',
		template: Handlebars.compile(n),
		events: {
			'submit .form': "submit",
			'click #add_covenants': "addConvernio",
			'click #add_telephone': 'addTelphone',
			'click .containerTel': 'trash'
		},
		render: function() {
			this.$el.empty();

			var dataOptionOccupation = [
				{ id: 1, value: "Analista de Sistemas"},
				{ id: 2, value: "Advogado"},
				{ id: 3, value: "Administrador"}
			];

			var configOccupation = {
				dataOption: dataOptionOccupation
			};

			this.$el.append(this.template({configOccupation: configOccupation}));
		},
		addConvernio: function() {
            var html = '<div class="form-group"><label class="col-sm-2 control-label" for="covenants">Convênios:</label><div class="col-sm-10"><select class="form-control covenants" name="covenants"><option selected value=""></option><option value="1">Bradesco</option><option value="2">Sul América</option><option value="3">Promédica</option></select></div></div>';
            $( "#container_add_covenants", this.$el ).before(html);
            this.linkAddField("container_add_covenants", "covenants");
		},
		addTelphone: function() {
			var html = '<div class="form-group containerTel"><label class="col-sm-2 control-label" for="telephone">Telefone:</label><div class="col-sm-9"><input type="text" class="form-control telephone" name="telephone" placeholder="Telefone" value=""><span class="containerTrash"><a href="javascript:;"><img src="images/icons/trash.png" class="trash" data-toggle="tooltip" data-placement="bottom" title="Excluir"></a></span></div></div>';

			$( "#container_add_telephone", this.$el ).before(html);

			this.linkAddField("container_add_telephone", "telephone");

			$( ".telephone", this.$el ).mask("(99).9999-9999");
			$( '.trash', this.$el ).tooltip();
		},
		remove: function(event) {
			console.log($(event.target).parent().parent().parent().parent().remove());
		},
		focus: function() {
			var that = this;

			// Focus input
			$( "#name", this.$el ).focus();

			// Mask
			$( "#cpf", this.$el ).mask("999.999.999-99");
			$( "#cep", this.$el ).mask("99.999-999");
			$( ".telephone", this.$el ).mask("(99) 9999-9999");

			// Datepicker
			$( "#birthday", this.$el ).datepicker({
				showOtherMonths: true,
				selectOtherMonths: true
			});

			this.$el.on("focus", ".containerTel:not(:first)", function () {
				$('.containerTrash', this).show();

				$('.containerTrash', this).on("click", function (event) {
					$(event.target).parent().parent().parent().parent().remove();
				});
			});
		},
		// Link "Adicionar telefone" dinamico, só é exibido se o último campo estiver com valor.
		linkAddField: function (container, field) {
			$( "#" + container).hide();
			$( "." + field + ":last" ).change(function(){
				if ($( "." + field + ":last" ).val() === "") {
					$( "#" + container ).hide();
				} else {
					$( "#" + container ).show();
				}
			});      
		},		
		submit: function(ev) {
			ev.preventDefault();
			ev.stopPropagation();

			this.model.set({
				name:       $('input[name="name"]', ev.target).val(),
				rg:         $('input[name="rg"]', ev.target).val(),
				cpf:        $('input[name="cpf"]', ev.target).val(),
				birthday:   $('input[name="birthday"]', ev.target).val(),
				sex:        $('select[name="sex"] option:selected', ev.target).val(),
				status:     0,
				street:     $('input[name="street"]', ev.target).val(),
				number:     $('input[name="number"]', ev.target).val(),
				district:   $('input[name="district"]', ev.target).val(),
				city:       $('select[name="city"]', ev.target).val(),
				state:      $('select[name="state"]', ev.target).val(),
				cep:        $('input[name="cep"]', ev.target).val(),
				complement: $('input[name="complement"]', ev.target).val()
			});

			this.model.save().then(function() {
				Backbone.history.navigate('', {trigger: true});
			});
		}
	});
});