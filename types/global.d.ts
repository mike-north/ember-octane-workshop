// Types for compiled templates
declare module 'shlack/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}
