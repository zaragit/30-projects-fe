import AddIcon from '@mui/icons-material/Add';
import { observer } from 'mobx-react';
import { useCallback } from 'react';

import Memo from './Memo/Memo';

function App({ store }) {
  const addMemo = useCallback(() => store.addMemo(), [store]);

  const editMemo = useCallback(
    (id, content) => store.editMemo(id, content),
    [store]
  );

  const setSize = useCallback(
    (id, width, height) => store.setSize(id, width, height),
    [store]
  );

  const setPosition = useCallback(
    (id, x, y) => store.setPosition(id, x, y),
    [store]
  );

  const removeMemo = useCallback((id) => store.removeMemo(id), [store]);

  return (
    <>
      {store.memos.map((memo) => (
        <Memo
          key={memo.id}
          remove={removeMemo}
          edit={editMemo}
          item={memo}
          setSize={setSize}
          setPosition={setPosition}
        />
      ))}

      <AddIcon
        onClick={addMemo}
        sx={{
          float: 'right',
          backgroundColor: '#e4e4e4',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '30px',
          border: '1px solid black',
        }}
      />
    </>
  );
}

export default observer(App);
