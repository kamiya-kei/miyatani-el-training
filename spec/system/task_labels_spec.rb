require 'rails_helper'

RSpec.describe 'TaskLabels', type: :system do
  describe 'TaskLabels' do
    before {
      task
      label
      sign_in_as(user)
    }

    let(:user) { FactoryBot.create(:user) }
    let(:task) { FactoryBot.create(:task, user_id: user.id) }
    let(:label) { FactoryBot.create(:label, user_id: user.id) }
    let(:subject_sleep) {
      subject
      sleep 0.5
    }
    describe 'ラベル設定' do
      subject {
        find('[data-testid="EditIcon"]').click
        find("[data-test-label='#{label.id}'] .MuiCheckbox-root").click
        click_button 'OK'
        page
      }
      it { is_expected.to have_content('ラベルを設定しました') }
      it { is_expected.to have_content(label.name) }
      it { expect { subject_sleep }.to change { task.task_labels.count }.from(0).to(1) }
    end

    describe 'ラベル設定解除' do
      subject {
        visit '/'
        find('[data-testid="EditIcon"]').click
        find("[data-test-label='#{label.id}'] .MuiCheckbox-root").click
        click_button 'OK'
        page
      }
      before { FactoryBot.create(:task_label, task_id: task.id, label_id: label.id) }

      it { is_expected.to have_content('ラベルを設定しました') }
      it { is_expected.to have_no_content(label.name) }
      it { expect { subject_sleep }.to change { task.task_labels.count }.from(1).to(0) }
    end
  end
end
