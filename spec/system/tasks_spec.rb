require 'rails_helper'

RSpec.describe 'Tasks', type: :system do
  describe 'タスク作成' do
    let(:task) { FactoryBot.build(:task) }

    it 'タスク作成実行' do
      visit root_path
      expect(page).to have_content('タスク作成')
      click_link 'タスク作成' # タスク作成ページへ
      expect(page).to have_current_path('/tasks/new')

      # 値を入力して投稿
      fill_in 'title', with: task.title
      fill_in 'description', with: task.description
      expect {
        click_button '投稿'
      }.to change { Task.count }.by(1)
      expect(page).to have_current_path('/')
      expect(page).to have_content('タスクを投稿しました')

      # タスク一覧でタスクが投稿されていることを確認
      expect(page).to have_content(task.title)
      expect(page).to have_content(task.description)
    end

    it 'タスク作成時のバリデーションエラーメッセージの表示' do
      visit 'tasks/new'
      expect(page).to have_no_content('タイトルを入力してください')
      # 何も入力せず空のまま投稿
      expect {
        click_button '投稿'
      }.not_to change { Task.count }
      # バリデーションエラーが表示される
      expect(page).to have_content('タイトルを入力してください')
    end

    it 'タスク作成キャンセル' do
      visit 'tasks/new'
      # 値を入力してキャンセル
      fill_in 'title', with: task.title
      fill_in 'description', with: task.description
      expect {
        click_link 'キャンセル'
      }.not_to change { Task.count }

      # タスク一覧でタスクが投稿されていないことを確認
      expect(page).to have_no_content(task.title)
      expect(page).to have_no_content(task.description)
    end
  end

  describe 'タスク編集・削除' do
    before do
      task.save
    end

    let(:task) { FactoryBot.build(:task) }
    let(:task_after) { FactoryBot.build(:task) }

    context 'タスク編集' do
      it 'タスク編集実行' do
        visit root_path
        click_link '編集' # 編集ページへ
        expect(page).to have_current_path("/tasks/#{task.id}/edit", ignore_query: true)

        # 変更前の値が入力欄にセットされている
        expect(find_field('title').value).to eq(task.title)
        expect(find_field('description').value).to eq(task.description)

        # 新しい値を入力して更新
        fill_in 'title', with: task_after.title
        fill_in 'description', with: task_after.description
        expect {
          click_button '更新'
        }.not_to change { Task.count }
        expect(page).to have_current_path('/')
        expect(page).to have_content('タスクを更新しました')

        # タスク一覧でタスクが更新されていることを確認
        expect(page).to have_no_content(task.title)
        expect(page).to have_no_content(task.description)
        expect(page).to have_content(task_after.title)
        expect(page).to have_content(task_after.description)
      end

      it 'タスク編集キャンセル' do
        # visit root_path
        # click_link '編集'
        visit "/tasks/#{task.id}/edit"

        # 新しい値を入力してキャンセル
        fill_in 'title', with: task_after.title
        fill_in 'description', with: task_after.description
        expect {
          click_link 'キャンセル'
        }.not_to change { Task.count }
        expect(page).to have_current_path('/')

        # タスク一覧でタスクが更新されていないことを確認
        expect(page).to have_content(task.title)
        expect(page).to have_content(task.description)
        expect(page).to have_no_content(task_after.title)
        expect(page).to have_no_content(task_after.description)
      end
    end

    context 'タスク削除' do
      it 'タスク削除実行' do
        visit root_path
        click_button '削除'
        expect(page).to have_content('本当によろしいですか？')
        sleep 1 # 確認ダイアログの表示アニメーションを待つ
        expect {
          click_button 'はい'
          # 下記1行はajax終了後にTask.countをチェックさせる為にexpec{}内に入れてます
          expect(page).to have_content('タスクが削除されました')
        }.to change { Task.count }.by(-1)
        expect(page).to have_no_content(task.title)
        expect(page).to have_no_content(task.description)
      end

      it 'タスク削除キャンセル' do
        visit root_path
        click_button '削除'
        expect(page).to have_content('本当によろしいですか？')
        sleep 1 # 確認ダイアログの表示アニメーションを待つ
        expect {
          click_button 'いいえ'
        }.not_to change { Task.count }
        expect(page).to have_content(task.title)
        expect(page).to have_content(task.description)
      end
    end
  end
end