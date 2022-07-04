import { Button } from 'vant';
import { NavBar } from 'vant';
import { Field } from 'vant';
import { Tab, Tabs } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { Cell, CellGroup } from 'vant';
import { List } from 'vant';
import { Empty } from 'vant';
import { Popup } from 'vant';
import { NoticeBar } from 'vant';
import { Swipe, SwipeItem } from 'vant';
const vant = {
  install(Vue: {
    component: (arg0: string, arg1: any) => void;
  }) {
    Vue.component(Button.name, Button);
    Vue.component(NavBar.name, NavBar);
    Vue.component(Field.name, Field);
    Vue.component(Tab.name, Tab);
    Vue.component(Tabs.name, Tabs);
    Vue.component(Collapse.name, Collapse);
    Vue.component(CollapseItem.name, CollapseItem);
    Vue.component(Cell.name, Cell);
    Vue.component(CellGroup.name, CellGroup);
    Vue.component(List.name, List);
    Vue.component(Empty.name, Empty);
    Vue.component(Popup.name, Popup);
    Vue.component(NoticeBar.name, NoticeBar);
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
  }
};
export default vant;
