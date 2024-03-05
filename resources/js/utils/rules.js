export function emailRules () {
    return [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
    ];
}
export function requiredRules () {
    return [(v) => !!v || 'Item is required'];
}
