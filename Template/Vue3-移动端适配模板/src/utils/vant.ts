import { Button, NavBar, Field, Tab, Tabs, Skeleton, Divider, RadioGroup, Radio, Col, Row, Cell, CellGroup } from 'vant';
const vant = {
    install(Vue: {
        component: (arg0: string, arg1: any) => void;
    }) {
        Vue.component(Button.name, Button);
        Vue.component(NavBar.name, NavBar);
        Vue.component(Field.name, Field);
        Vue.component(Tab.name, Tab);
        Vue.component(Tabs.name, Tab);
        Vue.component(Skeleton.name, Skeleton);
        Vue.component(Divider.name, Divider);
        Vue.component(RadioGroup.name, RadioGroup);
        Vue.component(Radio.name, Radio);
        Vue.component(Col.name, Col);
        Vue.component(Row.name, Row);
        Vue.component(Cell.name, Cell);
        Vue.component(CellGroup.name, CellGroup);


    }
};
export default vant;
