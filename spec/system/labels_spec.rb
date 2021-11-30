require 'rails_helper'

RSpec.describe 'Labels', type: :system do
  describe 'Labels' do
    before { sign_in_as(user) }

    let(:user) { FactoryBot.create(:user) }
    let(:subject_sleep) {
      subject
      sleep 0.5
    }

    describe 'ラベル作成' do
      subject {
        visit '/tasks/new'
        find('[data-testid="EditIcon"]').click
        click_button '新しいラベルを作成'
        fill_in 'prompt', with: label.name
        click_button '決定'
        page
      }
      let(:label) { FactoryBot.build(:label, user_id: user.id) }
      it { is_expected.to have_content('ラベルを作成しました') }
      it { is_expected.to have_content(label.name) }
      it { expect { subject_sleep }.to change { user.labels.count }.from(0).to(1) }
    end

    describe 'ラベル編集' do
      subject {
        label_before
        visit '/tasks/new'
        find('[data-testid="EditIcon"]').click
        find("[data-test-label='#{label_before.id}'] [data-testid='EditIcon']").click
        fill_in 'prompt', with: label_after.name
        click_button '決定'
        page
      }
      let(:label_before) { FactoryBot.create(:label, user_id: user.id) }
      let(:label_after) { FactoryBot.build(:label, user_id: user.id) }
      it { is_expected.to have_content('ラベル名を変更しました') }
      it { is_expected.to have_no_content(label_before.name) }
      it { is_expected.to have_content(label_after.name) }
    end

    describe 'ラベル削除' do
      subject {
        visit '/tasks/new'
        find('[data-testid="EditIcon"]').click
        find("[data-test-label='#{label.id}'] [data-testid='DeleteIcon']").click
        sleep 1
        click_button 'はい'
        page
      }
      let!(:label) { FactoryBot.create(:label, user_id: user.id) }
      it { is_expected.to have_content('ラベルを削除しました') }
      it { is_expected.to have_no_content(label.name) }
      it { expect { subject_sleep }.to change { user.labels.count }.from(1).to(0) }
    end

    describe 'ラベル一覧' do
      subject {
        visit '/'
        find('[data-test-label-list]').click
        page
      }
      let!(:labels) { FactoryBot.create_list(:label, 5, user_id: user.id) }
      it {
        subject
        expect(page).to have_content(labels[0].name)
        expect(page).to have_content(labels[3].name)
      }
    end
  end
end
