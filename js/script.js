(function($) {
	"use strict";

	$('#get_seo_gpt').click(function () {
		
		var post_id = $(this).data('post_id');
		var is_term = $(this).data('is_term');
		var plugin_priority = $(this).data('plugin_priority');
		var post_type = $(this).data('post_type');
		if(plugin_priority == 1){
			if(is_term == 1){
				
				if($(".postbox ").hasClass(".add-focus-keyphrase-metabox-input .aioseo-input")){
					var keyword = $('.add-focus-keyphrase-metabox-input .aioseo-input input').val();
					var brand = $('.seo_gpt_meta_brand').val();
					$('.seo_gpt_term_error').html('');
				}else if($('#focus-keyword-input-metabox').length){
					var keyword = $('#focus-keyword-input-metabox').val();
					var brand = $('.seo_gpt_meta_brand').val();
					$('.seo_gpt_term_error').html('');
				}else{
					var keyword = $('.seo_gpt_meta_keyword').val();
					var brand = $('.seo_gpt_meta_brand').val();
					$('.seo_gpt_term_error').html('');
				}
			}else{
				var keyword = $('.add-focus-keyphrase-metabox-input .aioseo-input input').val();
				var brand = $('#seoGptBrand').val();
				$('.seo_gpt_error').html('');
			}
		}else if(plugin_priority == 2){
			if(is_term == 1){
				var keyword = $('#focus-keyword-input-metabox').val();
				var brand = $('.seo_gpt_meta_brand').val();
				$('.seo_gpt_term_error').html('');
			}else{
				var keyword = $('#focus-keyword-input-metabox').val();
				var brand = $('#seoGptBrand').val();
				$('.seo_gpt_error').html('');
			}
		}else{
			if(is_term == 1){
				var keyword = $('.seo_gpt_meta_keyword').val();
				var brand = $('.seo_gpt_meta_brand').val();
				$('.seo_gpt_term_error').html('');
			}else{
				var keyword = $('#seoGptKeyword').val();
				var brand = $('#seoGptBrand').val();
				$('.seo_gpt_error').html('');
			}
		}
		if(plugin_priority == 1){
			if(is_term == 1){
				if($(".postbox ").hasClass(".add-focus-keyphrase-metabox-input .aioseo-input")){
					$(".aioseo-editor-single .ql-editor p").html("");
					// $("#hidden_wpseo_title").val('');
					$(".aioseo-editor-description .ql-editor p").html("");
					// $("#hidden_wpseo_desc").val('');
				}else if($('#focus-keyword-input-metabox').length){
					$("#yoast-google-preview-title-metabox .public-DraftStyleDefault-block").html("<span><span data-text='true'></span></span>");
					$("#hidden_wpseo_title").val('');
					$("#yoast-google-preview-description-metabox .public-DraftStyleDefault-block").html("<span><span data-text='true'></span></span>");
					$("#hidden_wpseo_desc").val('');
				}else{
					$("input[name='term_meta[sseo_title]']").val('');
					$("input[name='term_meta[sseo_description]']").val('');
				}
				
			}else{
				$(".aioseo-editor-single .ql-editor p").html("");
				// $("#yoast_wpseo_title").val('');
				$(".aioseo-editor-description .ql-editor p").html("");
				// $("#yoast_wpseo_metadesc").val('');
			}
		} else if(plugin_priority == 2){
			if(is_term == 1){
				$("#yoast-google-preview-title-metabox .public-DraftStyleDefault-block").html("<span><span data-text='true'></span></span>");
				$("#hidden_wpseo_title").val('');
				$("#yoast-google-preview-description-metabox .public-DraftStyleDefault-block").html("<span><span data-text='true'></span></span>");
				$("#hidden_wpseo_desc").val('');
			}else{
				$("#yoast-google-preview-title-metabox .public-DraftStyleDefault-block").html("<span><span data-text='true'></span></span>");
				$("#yoast_wpseo_title").val('');
				$("#yoast-google-preview-description-metabox .public-DraftStyleDefault-block").html("<span><span data-text='true'></span></span>");
				$("#yoast_wpseo_metadesc").val('');
			}
		}else{
			if(is_term == 1){
				$("input[name='term_meta[sseo_title]']").val('');
				$("input[name='term_meta[sseo_description]']").val('');
			}else{
				$('#sseoMetaTitle').val('');
				$('#sseoMetaDescription').val('');
			}
		}
		
        $.ajax({
            type: "POST",
            url: seo_gpt_ajax_url.url,
            data: "action=get_seo_gpt_content&nonce="+seo_gpt_ajax_url.nonce+"&post_id="+post_id+"&keyword="+keyword+"&brand="+brand+"&is_term="+is_term+"&plugin_priority="+plugin_priority+"&post_type="+post_type,
            dataType: 'json',
			 beforeSend: function() {
				 $('#get_seo_gpt').val('Loading...');
				 $('#get_seo_gpt').attr('disabled', true);
			},
            success: function (resp) {
            	if(resp.status == "success"){
            		if((resp.data.title.indexOf('Error') != -1) || (resp.data.description.indexOf('Error') != -1)){
					    alert('Error: Invalid or missing API KEY.');
					}else{
	            		if(plugin_priority == 1){
	            			if(is_term == 1){
	            				if($(".postbox ").hasClass(".add-focus-keyphrase-metabox-input .aioseo-input")){
	            					$(".aioseo-editor-single .ql-editor p").html(resp.data.title);
									// $("#hidden_wpseo_title").val(resp.data.title);
									$(".aioseo-editor-description .ql-editor p").html(resp.data.description);
									// $("#hidden_wpseo_desc").val(resp.data.description);
									setTimeout(function (){
										$('.aioseo-editor-single .ql-editor p').attr("tabindex",-1).focus();
									}, 500);
	            				}else if($('#focus-keyword-input-metabox').length){
	            					$("#yoast-google-preview-title-metabox .public-DraftStyleDefault-block").html("<span><span data-text='true'>"+resp.data.title+"</span></span>");
									$("#hidden_wpseo_title").val(resp.data.title);
									$("#yoast-google-preview-description-metabox .public-DraftStyleDefault-block").html("<span><span data-text='true'>"+resp.data.description+"</span></span>");
									$("#hidden_wpseo_desc").val(resp.data.description);
									setTimeout(function (){
										$('#yoast-google-preview-title-metabox .public-DraftStyleDefault-block').attr("tabindex",-1).focus();
									}, 500);
	            				}else{
	            					$("input[name='term_meta[sseo_title]']").val(resp.data.title);
									$("input[name='term_meta[sseo_description]']").val(resp.data.description);
									setTimeout(function (){
										$("input[name='term_meta[sseo_title]']").attr("tabindex",-1).focus();
									}, 500);
	            				}
	            				
	            			}else{
	            				$(".aioseo-editor-single .ql-editor p").html(resp.data.title);
								// $("#hidden_wpseo_title").val(resp.data.title);
								$(".aioseo-editor-description .ql-editor p").html(resp.data.description);
								// $("#hidden_wpseo_desc").val(resp.data.description);
								setTimeout(function (){
									$('.aioseo-editor-single .ql-editor p').attr("tabindex",-1).focus();
								}, 500);
	            			}
	            		}else if(plugin_priority == 2){
	            			if(is_term == 1){
	            				$("#yoast-google-preview-title-metabox .public-DraftStyleDefault-block").html("<span><span data-text='true'>"+resp.data.title+"</span></span>");
								$("#hidden_wpseo_title").val(resp.data.title);
								$("#yoast-google-preview-description-metabox .public-DraftStyleDefault-block").html("<span><span data-text='true'>"+resp.data.description+"</span></span>");
								$("#hidden_wpseo_desc").val(resp.data.description);
								setTimeout(function (){
									$('#yoast-google-preview-title-metabox .public-DraftStyleDefault-block').attr("tabindex",-1).focus();
								}, 500);
	            			}else{
	            				$("#yoast-google-preview-title-metabox .public-DraftStyleDefault-block").html("<span><span data-text='true'>"+resp.data.title+"</span></span>");
								$("#yoast_wpseo_title").val(resp.data.title);
								$("#yoast-google-preview-description-metabox .public-DraftStyleDefault-block").html("<span><span data-text='true'>"+resp.data.description+"</span></span>");
								$("#yoast_wpseo_metadesc").val(resp.data.description);
								setTimeout(function (){
									$('#yoast-google-preview-title-metabox .public-DraftStyleDefault-block').attr("tabindex",-1).focus();
								}, 500);
	            			}
	            		}else{
	            			if(is_term == 1){
								$("input[name='term_meta[sseo_title]']").val(resp.data.title);
								$("input[name='term_meta[sseo_description]']").val(resp.data.description);
								setTimeout(function (){
									$("input[name='term_meta[sseo_title]']").attr("tabindex",-1).focus();
								}, 500);
							}else{
								$('#sseoMetaTitle').val(resp.data.title);
								$('#sseoMetaDescription').val(resp.data.description);
								setTimeout(function (){
									$("#sseoMetaTitle").attr("tabindex",-1).focus();
								}, 500);
							}
	            		}
            		}
					$('#get_seo_gpt').val('Write It');
					$('#get_seo_gpt').attr('disabled', false);
            		return false;
            	}else if(resp.status == "sseo_error"){
            		$('#get_seo_gpt').val('Write It');
					$('#get_seo_gpt').attr('disabled', false);
            		alert(resp.message);
            		return false;
            	}else{
            		if(is_term == 1){
            			$('.seo_gpt_term_error').html(resp.message);
            		}else{
            			$('.seo_gpt_error').html(resp.message);
            		}
					$('#get_seo_gpt').val('Write It');
					$('#get_seo_gpt').attr('disabled', false);
					return false;
				}
            }
        });
		
        return false;
    });
	
	$('document').ready(function(){
		$('#seoGptKeyword').attr('maxlength',60);
		$('.seo_gpt_meta_keyword').attr('maxlength',60);
	});
	
	$(window).load(function(){
		if($('#get_seo_gpt').length){
			var sg_is_term = $('#get_seo_gpt').data('is_term');
			var sg_plugin_priority = $('#get_seo_gpt').data('plugin_priority');
			if(sg_is_term == 1 && sg_plugin_priority == 1){
				if($(".postbox ").hasClass(".add-focus-keyphrase-metabox-input .aioseo-input")){
					$('.field_seo_gpt_keyword').hide();
				}else if($('#focus-keyword-input-metabox').length){
					$('.field_seo_gpt_keyword').hide();
				}else{
					$('.field_seo_gpt_keyword').show();
				}
			}
		}
	});
})(jQuery);