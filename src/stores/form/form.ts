import { cast, SnapshotOut, types } from 'mobx-state-tree'

import {
    FormMode,
    FormRule,
    FormValueType,
    ifValueChanged,
    RuleProps,
    validateField,
} from '../../components'

export const FormModel = types.model('FormModel').props({
    id: types.identifier,
    page: types.maybe(types.string),
    mode: types.frozen<FormMode>(),
    defaultRule: types.frozen<FormRule>(),
    rules: types.frozen<FormRule>(),

    defaultValue: types.frozen<KeyValue<any>>(),
    values: types.frozen<KeyValue<any>>(),

    modified: types.frozen<KeyValue<boolean>>(),
    visited: types.frozen<KeyValue<boolean>>(),
    touched: types.frozen<KeyValue<boolean>>(),
    errors: types.frozen<KeyValue<string | undefined>>(),
})
export type FormModelType = SnapshotOut<typeof FormModel>

export const FormStoreModel = types
    .model('FormStoreModel')
    .props({
        sources: types.array(FormModel),
        sourcesMapping: types.optional(types.map(FormModel), {}),
    })
    .views((self) => ({
        valueGetter(id: string, field: string): any {
            const form = self.sourcesMapping.get(id)
            return form?.values[field]
        },
        formValues(id: string): KeyValue<any> {
            const form = self.sourcesMapping.get(id)
            return form ? form.values : {}
        },
        formErrors(id: string): KeyValue<string | undefined> {
            const form = self.sourcesMapping.get(id)
            return form ? form.errors : {}
        },
        formRules(id: string): FormRule {
            const form = self.sourcesMapping.get(id)
            return (form ? form.rules : {}) as FormRule
        },
        formModified(id: string): KeyValue<boolean> {
            const form = self.sourcesMapping.get(id)
            return form ? form.modified : {}
        },
        hasErrors(id: string): boolean {
            const form = self.sourcesMapping.get(id)
            if (form) {
                return Object.keys(form.errors).some((field) => !!form.errors[field])
            }
            return false
        },
        hasModified(id: string): boolean {
            const form = self.sourcesMapping.get(id)
            if (form) {
                return Object.keys(form.modified).some((field) => !!form.modified[field])
            }
            return false
        },
        hasVisited(id: string): boolean {
            const form = self.sourcesMapping.get(id)
            if (form) {
                return Object.keys(form.visited).some((field) => !!form.visited[field])
            }
            return false
        },
        hasTouched(id: string): boolean {
            const form = self.sourcesMapping.get(id)
            if (form) {
                return Object.keys(form.touched).some((field) => !!form.touched[field])
            }
            return false
        },
        getFieldError(id: string, field: string): string | undefined {
            const form = self.sourcesMapping.get(id)
            return form?.errors[field]
        },
        getFieldRule(id: string, field: string): RuleProps | undefined {
            const form = self.sourcesMapping.get(id)
            return form?.rules[field]
        },
        getFieldModified(id: string, field: string): boolean | undefined {
            const form = self.sourcesMapping.get(id)
            return form?.modified[field]
        },
        getForm(id: string): FormModelType | undefined {
            return self.sourcesMapping.get(id)
        },
    }))
    .actions((self) => ({
        reset(id: string) {
            const form = self.sourcesMapping.get(id)
            if (form) {
                form.values = { ...form.defaultValue }
                form.modified = {}
                form.visited = {}
                form.touched = {}
                form.errors = {}
                form.rules = { ...form.defaultRule }
            }
        },
        addForm(form: FormModelType) {
            const mapping = self.sourcesMapping.get(form.id)
            if (mapping) {
                self.sourcesMapping.delete(form.id)
            }
            self.sourcesMapping.set(form.id, FormModel.create(form))
            self.sources = cast(Object.values(self.sourcesMapping.toJSON()))
        },
        delForm(id: string) {
            if (self.sourcesMapping.get(id)) {
                self.sourcesMapping.delete(id)
            }
            self.sources = cast(Object.values(self.sourcesMapping.toJSON()))
        },
        valueSetter(id: string, field: string, value: any) {
            const form = self.sourcesMapping.get(id)
            if (form) {
                const defaultValue = { ...form.defaultValue }
                const changed = ifValueChanged(
                    value,
                    defaultValue[field],
                    self.getFieldRule(id, field),
                )
                const rule = self.getFieldRule(id, field)
                form.modified = { ...form.modified, [field]: changed }
                form.values = { ...form.values, [field]: value }
                const invalid = validateField(value, rule)
                const errors = { ...form.errors, [field]: invalid }
                if (!invalid) {
                    delete errors[field]
                }
                form.errors = errors
            }
        },
        setFieldError(id: string, field: string, value: string | undefined) {
            const form = self.sourcesMapping.get(id)
            if (form) {
                form.errors = { ...form.errors, [field]: value }
            }
        },
        setFieldModified(id: string, field: string, value: boolean) {
            const form = self.sourcesMapping.get(id)
            if (form) {
                form.modified = { ...form.modified, [field]: value }
            }
        },
        setFieldTouched(id: string, field: string, value: boolean) {
            const form = self.sourcesMapping.get(id)
            if (form) {
                form.touched = { ...form.touched, [field]: value }
            }
        },
        setFieldVisited(id: string, field: string, value: boolean) {
            const form = self.sourcesMapping.get(id)
            if (form) {
                form.visited = { ...form.visited, [field]: value }
            }
        },
        setFieldRule(id: string, field: string, value: RuleProps | null) {
            const form = self.sourcesMapping.get(id)
            if (form) {
                const copy = { ...form.rules }
                if (value) {
                    copy[field] = value
                } else {
                    delete copy[field]
                }

                const invalid = validateField(form.values[field], copy[field])
                const errors = { ...form.errors, [field]: invalid }
                if (!invalid) {
                    delete errors[field]
                }
                form.errors = errors
                form.rules = copy
            }
        },
        fieldValidator(id: string, field: string, value: FormValueType) {
            const rule = self.getFieldRule(id, field)
            const invalid = validateField(value, rule)
            const form = self.sourcesMapping.get(id)
            if (form) {
                const invalid = validateField(value, rule)
                const errors = { ...form.errors, [field]: invalid }
                if (!invalid) {
                    delete errors[field]
                }
                form.errors = errors
            }
            return invalid
        },
    }))

export type FormStoreType = SnapshotOut<typeof FormStoreModel>
