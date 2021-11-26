require 'rails_helper'

RSpec.describe 'Users', type: :system do
  describe '新規登録' do
    let(:user) { FactoryBot.build(:user) }

    describe 'トップから新規登録ページへ飛べる' do
      subject {
        visit root_path
        click_link '新規登録', match: :first
        page
      }
      it { is_expected.to have_current_path('/users/sign_up') }
    end

    describe '新規登録実行' do
      subject {
        visit '/users/sign_up'
        fill_in 'name', with: user.name
        fill_in 'password', with: user.password
        fill_in 'password_confirmation', with: user.password_confirmation
        click_button '登録'
        page
      }
      it { expect { subject }.to change { User.count }.from(0).to(1) }
      it { is_expected.to have_current_path('/') }
      it { is_expected.to have_content('タスク作成') }
    end
  end

  describe 'ログイン・ログアウト' do
    let!(:user) { FactoryBot.create(:user) }

    describe 'トップからログインページへ飛べる' do
      subject {
        visit root_path
        click_link 'ログイン', match: :first
        page
      }
      it { is_expected.to have_current_path('/users/sign_in') }
    end

    describe 'ログイン実行' do
      subject {
        sign_in_as(user)
        page
      }
      it { is_expected.to have_current_path('/') }
      it { is_expected.to have_content('タスク作成') }
    end

    describe 'ログアウト実行' do
      subject {
        sign_in_as(user)
        page.all('[aria-label="アカウントメニュー"]')[0].click
        page.all('[data-testid="LogoutIcon"]')[0].click
        page
      }
      it { is_expected.to have_no_content('タスク作成') }
      it { is_expected.to have_content('ログイン') }
    end

    describe 'アカウント削除実行' do
      subject {
        sign_in_as(user)
        page.all('[aria-label="アカウントメニュー"]')[0].click
        page.all('[data-testid="NoAccountsIcon"]')[0].click
        sleep 1
        click_button 'はい'
        page
      }
      it {
        expect {
          subject
          sleep 1
        }.to change { User.count }.from(1).to(0)
      }

      it { is_expected.to have_no_content('タスク作成') }
      it { is_expected.to have_content('ログイン') }
    end
  end
end
