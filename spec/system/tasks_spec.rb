require 'rails_helper'

RSpec.describe 'Tasks', type: :system do
  let(:user) { FactoryBot.create(:user) }
  describe 'タスクの作成' do
    let(:task) { FactoryBot.build(:task, user_id: user.id) }

    describe 'タスク一覧ページのタスク作成リンクのクリック' do
      subject {
        sign_in_as(user)
        click_link 'タスク作成' # タスク作成ページへ
        page
      }
      it { is_expected.to have_current_path('/tasks/new') }
    end

    describe '入力して投稿' do
      subject {
        sign_in_as(user)
        visit 'tasks/new'
        fill_in 'title', with: task.title
        fill_in 'description', with: task.description
        click_button '投稿'
        page
      }
      it { expect { subject }.to change { Task.count }.from(0).to(1) }
      it { is_expected.to have_current_path('/') }
      it { is_expected.to have_content('タスクを投稿しました') }

      it '投稿されたタスクがタスク一覧に表示されている' do
        subject
        expect(page).to have_content(task.title)
        expect(page).to have_content(task.description)
      end
    end

    describe '何も入力せずに投稿' do
      subject {
        sign_in_as(user)
        visit 'tasks/new'
        click_button '投稿'
      }
      it { is_expected.to have_no_content('タイトルを入力してください') }
      it { expect { subject }.not_to(change { Task.count }) }
    end

    describe '入力するがキャンセル' do
      subject {
        sign_in_as(user)
        visit 'tasks/new'
        fill_in 'title', with: task.title
        fill_in 'description', with: task.description
        click_link 'キャンセル'
        page
      }
      it { expect { subject }.not_to(change { Task.count }) }

      it '投稿されたタスクがタスク一覧に表示されている' do
        subject
        expect(page).to have_no_content(task.title)
        expect(page).to have_no_content(task.description)
      end
    end
  end

  describe 'タスクの編集' do
    let!(:task) { FactoryBot.create(:task, user_id: user.id) }
    let(:task_edit_path) { "/tasks/#{task.id}/edit" }
    let(:task_after) { FactoryBot.build(:task) }

    describe 'タスク一覧の編集ボタンをクリック' do
      subject {
        sign_in_as(user)
        click_link '編集' # 編集ページへ
        page
      }
      it { is_expected.to have_current_path(task_edit_path, ignore_query: true) }

      it '元の値が入力欄にセットされている' do
        subject
        expect(find_field('title').value).to eq(task.title)
        expect(find_field('description').value).to eq(task.description)
      end
    end

    describe 'タスクの編集を実行' do
      subject {
        sign_in_as(user)
        visit task_edit_path
        fill_in 'title', with: task_after.title
        fill_in 'description', with: task_after.description
        click_button '更新'
        page
      }
      it { expect { subject }.not_to(change { Task.count }) }
      it { is_expected.to have_current_path('/') }
      it { is_expected.to have_content('タスクを更新しました') }

      it 'タスク一覧に更新前のタスクの内容が表示されていない' do
        subject
        expect(page).to have_no_content(task.title)
        expect(page).to have_no_content(task.description)
      end

      it 'タスク一覧に更新後のタスクの内容が表示されている' do
        subject
        expect(page).to have_content(task_after.title)
        expect(page).to have_content(task_after.description)
      end
    end

    describe 'タスクの編集をキャンセル' do
      subject {
        sign_in_as(user)
        visit task_edit_path
        fill_in 'title', with: task_after.title
        fill_in 'description', with: task_after.description
        click_link 'キャンセル'
        page
      }
      it { expect { subject }.not_to(change { Task.count }) }
      it { is_expected.to have_current_path('/') }

      it 'タスク一覧のタスクが更新されていない' do
        subject
        expect(page).to have_content(task.title)
        expect(page).to have_content(task.description)
      end

      it 'タスク一覧にキャンセルした内容が反映されてしまっていない' do
        subject
        expect(page).to have_no_content(task_after.title)
        expect(page).to have_no_content(task_after.description)
      end
    end
  end

  describe 'タスクの削除' do
    let!(:task) { FactoryBot.create(:task, user_id: user.id) }
    let(:click_delete) {
      visit root_path
      click_button '削除'
      sleep 1 # 確認ダイアログの表示アニメーションを待つ
    }

    describe 'タスクの削除実行' do
      subject {
        sign_in_as(user)
        click_delete
        click_button 'はい'
        page
      }

      it {
        expect {
          subject
          sleep 1
        }.to change { Task.count }.from(1).to(0)
      }

      it { is_expected.to have_content('タスクが削除されました') }

      it 'タスク一覧から削除されたタスクが消えている' do
        subject
        expect(page).to have_no_content(task.title)
        expect(page).to have_no_content(task.description)
      end
    end

    describe 'タスク削除のキャンセル' do
      subject {
        sign_in_as(user)
        click_delete
        click_button 'いいえ'
        page
      }

      it {
        expect {
          subject
          sleep 1
        }.not_to(change { Task.count })
      }

      it 'タスク一覧から削除をキャンセルしたタスクが消えていない' do
        subject
        expect(page).to have_content(task.title)
        expect(page).to have_content(task.description)
      end
    end
  end

  describe 'タスク一覧の並び順' do
    let!(:tasks) {
      [
        { created_at: '2021-11-01 00:00:00', deadline: '2021-11-02 00:00:00', priority_number: 1 },
        { created_at: '2021-11-02 00:00:00', deadline: '2021-11-01 00:00:00', priority_number: 2 },
        { created_at: '2021-11-03 00:00:00', deadline: '2021-11-03 00:00:00', priority_number: 0 }
      ].map { |args| FactoryBot.create(:task, user_id: user.id, **args) }
    }

    context 'ページ表示直後' do
      subject {
        sign_in_as(user)
        sleep 1
        page.body
      }
      it '作成日時降順に並んでいる' do
        expect(subject).to match /#{tasks[2].title}.*#{tasks[1].title}.*#{tasks[0].title}/
      end
    end

    context '作成日時の並べ替えボタンをクリックしたとき' do
      subject {
        sign_in_as(user)
        click_button '作成日時'
        sleep 1
        page.body
      }
      it '作成日時昇順に並びが変わる' do
        expect(subject).to match /#{tasks[0].title}.*#{tasks[1].title}.*#{tasks[2].title}/
      end
    end

    context '期限の並べ替えボタンをクリックしたとき' do
      subject {
        sign_in_as(user)
        click_button '期限'
        sleep 1
        page.body
      }
      it '期限降順に並びが変わる' do
        expect(subject).to match /#{tasks[2].title}.*#{tasks[0].title}.*#{tasks[1].title}/
      end
    end

    context '期限の並べ替えボタンを2回クリックしたとき' do
      subject {
        sign_in_as(user)
        2.times { click_button '期限' }
        sleep 1
        page.body
      }
      it '期限昇順に並びが変わる' do
        expect(subject).to match /#{tasks[1].title}.*#{tasks[0].title}.*#{tasks[2].title}/
      end
    end

    context '優先度の並べ替えボタンをクリックしたとき' do
      subject {
        sign_in_as(user)
        click_button '優先度'
        sleep 1
        page.body
      }
      it '優先度降順に並びが変わる' do
        expect(subject).to match /#{tasks[1].title}.*#{tasks[0].title}.*#{tasks[2].title}/
      end
    end

    context '優先度の並べ替えボタンを2回クリックしたとき' do
      subject {
        sign_in_as(user)
        2.times { click_button '優先度' }
        sleep 1
        page.body
      }
      it '優先度昇順に並びが変わる' do
        expect(subject).to match /#{tasks[2].title}.*#{tasks[0].title}.*#{tasks[1].title}/
      end
    end
  end

  describe 'タスクの検索' do
    let!(:tasks) {
      [
        { title: 'AAAAA', description: 'XXXXX', done_id: -1 },
        { title: 'BBBBB', description: 'XXXXX', done_id: 0 },
        { title: 'CCCCC', description: 'XXAAX', done_id: 1 },
        { title: 'AABCC', description: 'XXXXX', done_id: 1 },
        { title: 'CCBAA', description: 'XXXXX', done_id: -1 }
      ].map { |args| FactoryBot.create(:task, user_id: user.id, **args) }
    }

    describe 'タイトルのキーワード検索＆ステータス未着手で検索' do
      subject {
        sign_in_as(user)
        fill_in 'word', with: 'AA'
        find('label', exact_text: 'タイトル').click
        find('label', exact_text: '着手').click # チェック解除
        find('label', exact_text: '完了').click # チェック解除
        click_button 'search'
        page
      }
      it { is_expected.to have_content(tasks[0].title) }
      it { is_expected.to have_no_content(tasks[1].title) }
      it { is_expected.to have_no_content(tasks[2].title) }
      it { is_expected.to have_no_content(tasks[3].title) }
      it { is_expected.to have_content(tasks[4].title) }
    end

    describe '内容のキーワード検索＆ステータス着手・完了で検索' do
      subject {
        sign_in_as(user)
        fill_in 'word', with: 'XXX'
        find('label', exact_text: '内容').click
        find('label', exact_text: '未着手').click # チェック解除
        click_button 'search'
        page
      }
      it { is_expected.to have_no_content(tasks[0].title) }
      it { is_expected.to have_content(tasks[1].title) }
      it { is_expected.to have_no_content(tasks[2].title) }
      it { is_expected.to have_content(tasks[3].title) }
      it { is_expected.to have_no_content(tasks[4].title) }
    end
  end

  describe 'ページネーション' do
    let!(:tasks) {
      (0...20).
        map { |i| { created_at: Time.current.ago(i.days) } }.
        map { |args| FactoryBot.create(:task, user_id: user.id, **args) }
    }

    describe 'タスク一覧1ページ目' do
      subject {
        sign_in_as(user)
        page
      }
      it '10件のタスクのみ表示されている' do
        subject
        expect(page.all('.task-card').count).to eq 10
      end

      it '最新10件が表示されている' do
        subject
        expect(page).to have_content(tasks[0].title)
        expect(page).to have_content(tasks[9].title)
      end

      it '最新10件以外のタスクが表示されていない' do
        subject
        expect(page).to have_no_content(tasks[10].title)
        expect(page).to have_no_content(tasks[19].title)
      end
    end

    describe 'タスク一覧2ページ目' do
      subject {
        sign_in_as(user)
        page.all('[aria-label="Go to page 2"]')[0].click
        page
      }
      it '最新11-20件が表示されている' do
        subject
        expect(page).to have_content(tasks[10].title)
        expect(page).to have_content(tasks[19].title)
      end

      it '最新11-20件以外のタスクが表示されていない' do
        subject
        expect(page).to have_no_content(tasks[0].title)
        expect(page).to have_no_content(tasks[9].title)
      end
    end
  end
end
