import test from 'node:test';
import assert from 'node:assert/strict';
import { editorDocument, storedDocument, updateChapterDraft, publishChapterPreview } from '../src/admin/documents.js';
const draft = text => ({ type:'doc',content:[{type:'paragraph',content:[{type:'text',text}]}] });
test('editing a published chapter preserves its published title and document until publish',()=>{
  const before={id:'chapter',status:'published',published_snapshot_json:{title:'Original',document:draft('Live text')}};
  const edited=updateChapterDraft(before,'New draft',draft('Private changes'));
  assert.equal(edited.published_snapshot_json.title,'Original');
  assert.equal(edited.published_snapshot_json.document.content[0].content[0].text,'Live text');
  const published=publishChapterPreview(edited,'New draft',edited.draft_content_json);
  assert.equal(published.published_snapshot_json.title,'New draft');
  published.draft_content_json.content[0].content[0].text='Another edit';
  assert.equal(published.published_snapshot_json.document.content[0].content[0].text,'Private changes');
});
test('stored image documents retain placement and media IDs without temporary blob URLs',()=>{
  const doc={type:'doc',content:[{type:'image',attrs:{mediaId:'image-1',widthPercent:60,align:'right',caption:'A scene',alt:'Custom alt'}}]};
  const materialized=editorDocument(doc,[{id:'image-1',url:'blob:temporary-preview',default_alt:'Default alt'}]);
  assert.equal(materialized.content[0].attrs.src,'blob:temporary-preview');
  assert.deepEqual(storedDocument(materialized),doc);
  assert.equal(doc.content[0].attrs.src,undefined);
});
