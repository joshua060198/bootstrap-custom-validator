;(function() {

    var defaultOpt = {
        messages: {
            valueMissing: 'Please fill out this field.',
            typeMismatch: {
                general: 'Please use the correct input type.',
                email: 'Please enter a valid email address.',
                url: 'Please enter a valid URL.'
            },
            tooShort: 'Text is too short.',
            tooLong: 'Text is too long.',
            badInput: 'Please enter a number.',
            stepMismatch: 'Please select a valid value.',
            rangeOverflow: 'Please select a smaller value.',
            rangeUnderflow: 'Please select a larger value.',
            patternMismatch: 'Please match the requested format.',
            general: 'The value you entered for this field is invalid.'
        },

        input: {
            borderInvalid: '#dc3545',
            borderValid: '#28a745',
            focusInvalid: 'rgba(220,53,69,.25)',
            focusValid: 'rgba(40,167,69,.25)',
            iconInvalid: '#dc3545',
            iconValid: '#28a745',
        },
        
        messageContainer: {
            backgroundInvalid: '#f14668',
            backgroundValid: '#48c774',
            colorInvalid: '#ffffff',
            colorValid: '#ffffff',
            width: '100%',
            alignment: 'auto',
            textAlign: 'center',
            marginTop: '10px'
        }
    }

    // CONSTRUCTOR
    this.FormValidation = function(options) {
        this.options = defaultOpt
        this.rules = []
        if (options) updateOptions(this.options, options)
        initCSS(this.options)
    }

    // initialize CSS
    function initCSS(options) {
        let a = document.createElement('style')
        let head = document.head || document.getElementsByTagName('head')[0]
        head.appendChild(a)

        a.type = 'text/css';
        a.innerHTML = '.invalid-feedback .feedback-icon,.valid-feedback .feedback-icon{position:absolute;width:auto;top:47px;right:15px;margin-top:0}.left-side .invalid-feedback .feedback-icon,.left-side .valid-feedback .feedback-icon{right:calc(1.5rem + 10px)} .custom-select.is-valid:focus, .form-control.is-valid:focus, .was-validated .custom-select:valid:focus, .was-validated .form-control:valid:focus { box-shadow: 0 0 0 0.2rem ' + options.input.focusValid + ' !important; } .custom-select.is-invalid:focus, .form-control.is-invalid:focus, .was-validated .custom-select:invalid:focus, .was-validated .form-control:invalid:focus { box-shadow: 0 0 0 0.2rem ' + options.input.focusInvalid + ' !important; } .valid-feedback { color: ' + options.input.iconValid + ' !important; } .invalid-feedback { color: ' + options.input.iconInvalid + ' !important; } .custom-select.is-invalid, .form-control.is-invalid, .was-validated .custom-select:invalid, .was-validated .form-control:invalid { border-color: ' + options.input.borderInvalid + ' } .custom-select.is-valid, .form-control.is-valid, .was-validated .custom-select:valid, .was-validated .form-control:valid { border-color: ' + options.input.borderValid + ' } .invalid-feedback .feedback-text, .valid-feedback .feedback-text{padding:5px 15px 5px 15px;border-radius:5px;margin-top:' + options.messageContainer.marginTop + ';width:' + options.messageContainer.width + ';text-align:' + options.messageContainer.textAlign + ';' + (options.messageContainer.alignment === 'left' ? 'margin-left: auto;' : options.messages.alignment === 'right' ? 'margin-right: auto;' : 'margin-left: auto; margin-right: auto;') + '} .invalid-feedback .feedback-text { background-color:' + options.messageContainer.backgroundInvalid +';color:' + options.messageContainer.colorInvalid + ';} .valid-feedback .feedback-text { background-color:' + options.messageContainer.backgroundValid +';color:' + options.messageContainer.colorValid + ';}';
    }

    // update default options with the new options
    function updateOptions(defaultOpt, newOpt) {
        if (newOpt.messages) {
            defaultOpt.messages.valueMissing = newOpt.messages.valueMissing | defaultOpt.messages.valueMissing
            defaultOpt.messages.tooShort = newOpt.messages.tooShort | defaultOpt.messages.tooShort
            defaultOpt.messages.tooLong = newOpt.messages.tooLong | defaultOpt.messages.tooLong
            defaultOpt.messages.badInput = newOpt.messages.badInput | defaultOpt.messages.badInput
            defaultOpt.messages.stepMismatch = newOpt.messages.stepMismatch | defaultOpt.messages.stepMismatch
            defaultOpt.messages.rangeOverflow = newOpt.messages.rangeOverflow | defaultOpt.messages.rangeOverflow
            defaultOpt.messages.rangeUnderflow = newOpt.messages.rangeUnderflow | defaultOpt.messages.rangeUnderflow
            defaultOpt.messages.patternMismatch = newOpt.messages.patternMismatch | defaultOpt.messages.patternMismatch
            defaultOpt.messages.general = newOpt.messages.general | defaultOpt.messages.general
            
            if (newOpt.messages.typeMismatch) {
                defaultOpt.messages.typeMismatch.general = newOpt.messages.typeMismatch.general | defaultOpt.messages.typeMismatch.general
                defaultOpt.messages.typeMismatch.email = newOpt.messages.typeMismatch.email | defaultOpt.messages.typeMismatch.email
                defaultOpt.messages.typeMismatch.url = newOpt.messages.typeMismatch.url | defaultOpt.messages.typeMismatch.url
            }
        }

        if (newOpt.input) {
            defaultOpt.input.borderInvalid = newOpt.input.borderInvalid | defaultOpt.input.borderInvalid
            defaultOpt.input.borderValid = newOpt.input.borderValid | defaultOpt.input.borderValid
            defaultOpt.input.focusInvalid = newOpt.input.focusInvalid | defaultOpt.input.focusInvalid
            defaultOpt.input.focusValid = newOpt.input.focusValid | defaultOpt.input.focusValid
            defaultOpt.input.iconInvalid = newOpt.input.iconInvalid | defaultOpt.input.iconInvalid
            defaultOpt.input.iconValid = newOpt.input.iconValid | defaultOpt.input.iconValid
        }

        if (newOpt.messageContainer) {
            defaultOpt.messageContainer.backgroundInvalid = newOpt.messageContainer.backgroundInvalid | defaultOpt.messageContainer.backgroundInvalid
            defaultOpt.messageContainer.backgroundValid = newOpt.messageContainer.backgroundValid | defaultOpt.messageContainer.backgroundValid
            defaultOpt.messageContainer.colorInvalid = newOpt.messageContainer.colorInvalid | defaultOpt.messageContainer.colorInvalid
            defaultOpt.messageContainer.colorValid = newOpt.messageContainer.colorValid | defaultOpt.messageContainer.colorValid
            defaultOpt.messageContainer.width = newOpt.messageContainer.width | defaultOpt.messageContainer.width
            defaultOpt.messageContainer.alignment = newOpt.messageContainer.alignment | defaultOpt.messageContainer.alignment
            defaultOpt.messageContainer.textAlign = newOpt.messageContainer.textAlign | defaultOpt.messageContainer.textAlign
            defaultOpt.messageContainer.marginTop = newOpt.messageContainer.marginTop | defaultOpt.messageContainer.marginTop
        }
    }

    // get the corresponding error message
    function getErrorMessage(formInstance, element) {
        if (element.disabled || element.type === 'reset' || element.type === 'submit' || element.type === 'button' || element.type === 'hidden') return '';

        let validity = element.validity

        // If valid, return empty string
        if (validity.valid) return '';

        // If field is required and empty
        if (validity.valueMissing) return formInstance.options.messages.valueMissing;

        // If not the right type
        if (validity.typeMismatch) {

            // Email
            if (element.type === 'email') return formInstance.options.messages.typeMismatch.email;

            // URL
            if (element.type === 'url') return formInstance.options.messages.typeMismatch.url;

        }

        // If too short
        if (validity.tooShort) return formInstance.options.messages.tooShort;

        // If too long
        if (validity.tooLong) return formInstance.options.messages.tooLong;

        // If number input isn't a number
        if (validity.badInput) return formInstance.options.messages.badInput;

        // If a number value doesn't match the step interval
        if (validity.stepMismatch) return formInstance.options.messages.stepMismatch;

        // If a number field is over the max
        if (validity.rangeOverflow) return formInstance.options.messages.rangeOverflow;

        // If a number field is below the min
        if (validity.rangeUnderflow) return formInstance.options.messages.rangeUnderflow;

        // If pattern doesn't match
        if (validity.patternMismatch) return formInstance.options.messages.patternMismatch

        // If all else fails, return a generic catchall error
        return formInstance.options.messages.general;
    }

    // check for input error
    function checkError(formInstance, element, first_time = false) {
        if (!element.checkValidity()) {
            try {
                element.parentElement.querySelector('.invalid-feedback .feedback-text').innerHTML = getErrorMessage(formInstance, element)
            } catch(error) {
                console.log(element)
                console.log(error)
            }
        }
        
        for(keys in formInstance.rules) {
            if (element.classList.contains(keys)) {
                if (!first_time) {
                    if (!formInstance.rules[keys].done) {
                        formInstance.rules[keys].callback(element)
                        formInstance.rules[keys].done = true
                    }
                } else {
                    formInstance.rules[keys].callback(element)
                }
            }
        }
    }

    // static funtion to change default options
    FormValidation.options = function(options) {
        updateOptions(defaultOpt, options)
    }

    // main function to initialize form validation
    FormValidation.prototype.validate = function(selector) {
        let formInstance = this
        let forms = document.querySelectorAll(selector);
        Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                let fields = form.querySelectorAll('input, select');
                let scrollElem = null
                let is_error = false
                Array.prototype.filter.call(fields, function(field, index) {
                    if (field.classList.contains("ignore-validation")) return;
                    if (!form.classList.contains('was-validated')) {
                        checkError(formInstance, field, true)
                    } else {
                        checkError(formInstance, field)
                    }
                    if (!field.checkValidity()) {
                        if(!scrollElem) {
                            scrollElem = field
                        }
                        is_error = true
                    }
                    if (!form.classList.contains('was-validated')) {
                        field.addEventListener('keyup', function() {
                            checkError(formInstance, field)
                        })
                        if (field.nodeName === 'SELECT' || field.type === 'file' || field.type === 'number') {
                            field.addEventListener('change', function() {
                                checkError(formInstance, field)
                            })
                        }
                    }
                    if (index == fields.length-1) {
                        if (is_error) {
                            window.scroll({top: scrollElem.getBoundingClientRect().top + document.documentElement.scrollTop - scrollElem.getBoundingClientRect().height - 100, left: 0, behavior: 'smooth' });
                        }
                        form.classList.add('was-validated');
                    }
                })

            }, false);
        });
        return this
    }

    // method to be called if you need to force input validation
    FormValidation.prototype.forceValidation = function(selector, bypass = false) {
        checkError(this, document.querySelector(selector), bypass)
        return this
    }
  
    // add custom rule and callback to one or more element when checking error occur
    FormValidation.prototype.addRule = function(name, callback) {
        this.rules[name] = {callback: callback, done: false}
        return this
    }
}());