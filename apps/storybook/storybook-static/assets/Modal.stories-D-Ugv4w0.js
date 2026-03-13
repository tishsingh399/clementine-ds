import{j as e}from"./index-jyNdYUlS.js";import{r as m}from"./index-ZH-6pyQh.js";import{p as D,u as J,k as P,l as G,m as H,o as L,q as V,r as K,s as Q,M as i,a as c,h as x}from"./Modal-Bqfdu9jx.js";import{S as U}from"./Stack-u3kzGs_0.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-DVyBTwwr.js";var M={root:"m_b6d8b162"};function X(t){if(t==="start")return"start";if(t==="end"||t)return"end"}const Y={inherit:!1},Z=H((t,{variant:n,lineClamp:s,gradient:u,size:r,color:o})=>({root:{"--text-fz":Q(r),"--text-lh":K(r),"--text-gradient":n==="gradient"?V(u,t):void 0,"--text-line-clamp":typeof s=="number"?s.toString():void 0,"--text-color":o?L(o,t):void 0}})),p=D((t,n)=>{const s=J("Text",Y,t),{lineClamp:u,truncate:r,inline:o,inherit:y,gradient:$,span:B,__staticSelector:R,vars:k,className:v,style:q,classNames:F,styles:_,unstyled:z,variant:A,mod:W,size:E,attributes:I,...N}=s,w=P({name:["Text",R],props:s,classes:M,className:v,style:q,classNames:F,styles:_,unstyled:z,attributes:I,vars:k,varsResolver:Z});return e.jsx(G,{...w("root",{focusable:!0}),ref:n,component:B?"span":"p",variant:A,mod:[{"data-truncate":X(r),"data-line-clamp":typeof u=="number","data-inline":o,"data-inherit":y},W],size:E,...N})});p.classes=M;p.displayName="@mantine/core/Text";const ae={title:"Components/Modal",component:i,argTypes:{size:{control:"select",options:["xs","sm","md","lg","xl"]},centered:{control:"boolean"},withCloseButton:{control:"boolean"}},args:{title:"Modal Title",size:"md",centered:!1,withCloseButton:!0}},a={render:t=>{const[n,s]=m.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(c,{onClick:()=>s(!0),children:"Open Modal"}),e.jsx(i,{...t,opened:n,onClose:()=>s(!1),children:e.jsx(p,{children:"Modal content goes here."})})]})}},l={args:{centered:!0},render:t=>{const[n,s]=m.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(c,{onClick:()=>s(!0),children:"Open Centered"}),e.jsx(i,{...t,opened:n,onClose:()=>s(!1),children:e.jsx(p,{children:"Centered modal content."})})]})}},d={args:{title:"Create Access Request"},render:t=>{const[n,s]=m.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(c,{onClick:()=>s(!0),children:"Request Access"}),e.jsx(i,{...t,opened:n,onClose:()=>s(!1),children:e.jsxs(U,{gap:"md",children:[e.jsx(x,{label:"Target System",placeholder:"e.g., prod-db-01"}),e.jsx(x,{label:"Justification",placeholder:"Reason for access"}),e.jsx(c,{fullWidth:!0,children:"Submit Request"})]})})]})}};var g,f,h;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => {
    const [opened, setOpened] = useState(false);
    return <>
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
        <Modal {...args} opened={opened} onClose={() => setOpened(false)}>
          <Text>Modal content goes here.</Text>
        </Modal>
      </>;
  }
}`,...(h=(f=a.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var C,S,j;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    centered: true
  },
  render: args => {
    const [opened, setOpened] = useState(false);
    return <>
        <Button onClick={() => setOpened(true)}>Open Centered</Button>
        <Modal {...args} opened={opened} onClose={() => setOpened(false)}>
          <Text>Centered modal content.</Text>
        </Modal>
      </>;
  }
}`,...(j=(S=l.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var T,O,b;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    title: 'Create Access Request'
  },
  render: args => {
    const [opened, setOpened] = useState(false);
    return <>
        <Button onClick={() => setOpened(true)}>Request Access</Button>
        <Modal {...args} opened={opened} onClose={() => setOpened(false)}>
          <Stack gap="md">
            <TextInput label="Target System" placeholder="e.g., prod-db-01" />
            <TextInput label="Justification" placeholder="Reason for access" />
            <Button fullWidth>Submit Request</Button>
          </Stack>
        </Modal>
      </>;
  }
}`,...(b=(O=d.parameters)==null?void 0:O.docs)==null?void 0:b.source}}};const le=["Default","Centered","WithForm"];export{l as Centered,a as Default,d as WithForm,le as __namedExportsOrder,ae as default};
