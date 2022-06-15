import { v1 as uuidv1 } from 'uuid';
import { action, autorun, makeObservable, observable } from 'mobx';

export class MemoModel {
  id = uuidv1();
  content = '';
  position = { x: 0, y: 0 };
  width = 250;
  height = 300;

  constructor() {
    makeObservable(this, {
      content: observable,
      position: observable,
      width: observable,
      height: observable,
    });
  }
}

export default class MemoStore {
  id = 'memoStore';
  localStorage = null;
  memos = [];

  constructor() {
    makeObservable(this, {
      memos: observable,
      addMemo: action,
      editMemo: action,
      setPosition: action,
      setSize: action,
      removeMemo: action,
    });

    this.initLocalStorage();

    autorun(() => {
      if (this.localStorage !== null) {
        this.localStorage.setItem(this.id, JSON.stringify(this.memos));
      }
    });
  }

  addMemo() {
    this.memos.push(new MemoModel());
  }

  editMemo(id, content) {
    this.memos[this.getMemoIndex(id)].content = content;
  }

  getMemoIndex(id) {
    return this.memos.findIndex((memo) => memo.id === id);
  }

  setSize(id, width, height) {
    const index = this.getMemoIndex(id);
    this.memos[index].width = width;
    this.memos[index].height = height;
  }

  setPosition(id, x, y) {
    const index = this.getMemoIndex(id);
    this.memos[index].position = { x, y };
  }

  removeMemo(id) {
    this.memos.splice(this.getMemoIndex(id), 1);
  }

  initLocalStorage() {
    this.localStorage = window.localStorage;
    this.localStorage[this.id] != null && this.loadLocalStorage();
  }

  loadLocalStorage() {
    this.memos = JSON.parse(this.localStorage.getItem(this.id));
  }
}
