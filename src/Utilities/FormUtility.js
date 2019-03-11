class FormUtility {

    static addNameToChildren(children, formName) {
        
        let updatedChildren = Array.isArray(children)
        ? children.map(child => {
            let props = {
                ...child.props,
                formName: formName,
            };

            let newChild = {...child, props};

            return newChild;
        })
        : null;

        if(updatedChildren === null) {
            let props = { ...children.props, formName: formName }
            updatedChildren = {...children, props};
        }

        return updatedChildren;
    }

    static createChildFromProps(props) {

        let value = props.value
        ? props.value
        : null;

        return {
            name: props.name,
            formName: props.formName,
            value: value,
            rules: props.rules,
            valid: false,
            options: [],
        }
    }

    static findFormIndexByName(forms, formName) {
        let index = -1;
        for(let i = 0; i < forms.length; i++) {
            if(forms[i].name === formName) {
                index = i;
                break;
            }
        }

        return index;
    }

    static findFormChildIndexByName(form, childName) {
        let index = -1;
        for(let i = 0; i < form.children.length; i++) {
            if(form.children[i].name === childName) {
                index = i;
                break;
            }
        }

        return index;
    }

    static findFormChildByName(form, childName) {
        let index = -1;
        for(let i = 0; i < form.children.length; i++) {
            if(form.children[i].name === childName) {
                index = i;
                break;
            }
        }

        return form.children[index];
    }

    static getChildValue(form, childName) {
        for(let i = 0; i < form.children.length; i++) {
            if(form.children[i].name === childName) {
                return form.children[i].value;
            }
        }
    }
}

export default FormUtility;