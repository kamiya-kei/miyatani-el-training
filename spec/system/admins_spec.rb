require 'rails_helper'

RSpec.describe '管理者ページ', type: :system do
  describe '管理者ページ' do
    before do
      sign_in_as(admin)
    end
    let(:admin) { FactoryBot.create(:user) }
    let(:user) { FactoryBot.create(:user) }
    let(:tasks) { FactoryBot.create_list(:task, :tasks_count, user_id: user.id) }

    describe 'ユーザー一覧' do
      subject {
        tasks
        visit '/admin'
        page
      }
      let!(:users) { FactoryBot.create_list(:user, 3) }
      let(:tasks_count) { 5 }
      it { is_expected.to have_content('管理画面') }
      it 'タスク数が取得・表示できている' do
        subject
        expect(page.all("[data-test-user='#{user.id}'] td")[1].text).to eq(tasks_count.to_s)
        expect(page.all("[data-test-user='#{users[0].id}'] td")[1].text).to eq('0')
      end
    end

    describe '新規ユーザー作成' do
      subject {
        visit '/admin'
        click_link '新規ユーザー作成'
        fill_in 'name', with: new_user.name
        fill_in 'password', with: new_user.password
        fill_in 'password_confirmation', with: new_user.password_confirmation
        click_button '作成'
        page
      }
      let(:new_user) { FactoryBot.build(:user) }
      it { expect { subject }.to change { User.count }.from(1).to(2) }
      it { is_expected.to have_current_path('/admin') }
      it { is_expected.to have_content('ユーザー情報を更新しました') }
      it { is_expected.to have_content(new_user.name) }
    end

    describe 'ユーザー編集' do
      subject {
        user
        visit '/admin'
        page.all("[data-test-user='#{user.id}'] button[aria-label='more']")[0].click
        click_link '編集'
        fill_in 'name', with: user_new_info.name
        fill_in 'password', with: user_new_info.password
        fill_in 'password_confirmation', with: user_new_info.password_confirmation
        click_button '更新'
        page
      }
      let(:user_new_info) { FactoryBot.build(:user) }
      it { is_expected.to have_current_path('/admin') }
      it { is_expected.to have_content('ユーザー情報を更新しました') }
      it { is_expected.to have_content(user_new_info.name) }
      it { is_expected.to have_no_content(user.name) }
    end

    describe 'ユーザー削除' do
      subject {
        user
        visit '/admin'
        page.all("[data-test-user='#{user.id}'] button[aria-label='more']")[0].click
        page.all('[data-test-button="delete"]')[0].click
        sleep 1
        click_button 'はい'
        page
      }
      it { expect {
        subject
        sleep 1
      }.not_to(change { User.count }) }
      it { is_expected.to have_content('ユーザーを削除しました') }
      it { is_expected.to have_no_content(user.name) }
    end

    fdescribe 'ユーザータスク一覧' do
      subject {
        tasks
        visit '/admin'
        page.all("[data-test-user='#{user.id}'] button[aria-label='more']")[0].click
        click_link 'タスク一覧'
        page
      }
      let(:tasks_count) { 10 }
      it { is_expected.to have_content("#{user.name}さんのタスク一覧") }
      it { is_expected.to have_content(tasks[0].title) }
    end
  end
end
