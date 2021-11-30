require 'rails_helper'

RSpec.describe Task, type: :model do
  describe '#validate' do
    let(:task) { FactoryBot.build(:task, params) }

    describe '正常系' do
      subject { task }

      context '全ての値がセットされているとき' do
        let(:params) { {} }
        it { is_expected.to be_valid }
      end

      context 'タスクの説明が空のとき' do
        let(:params) { { description: '' } }
        it { is_expected.to be_valid }
      end

      context 'タスクの期限が空のとき' do
        let(:params) { { deadline: '' } }
        it { is_expected.to be_valid }
      end
    end

    describe '異常系' do
      subject {
        task.valid?
        task.errors.full_messages
      }

      context 'タスクのタイトルが空のとき' do
        let(:params) { { title: '' } }
        it { is_expected.to include("Title can't be blank") }
      end

      context 'タスクのステータスが-1,0,1以外の時' do
        let(:params) { { done_id: 2 } }
        it { is_expected.to include('Done is not included in the list') }
      end

      context 'タスクのステータスが0,1,2以外の時' do
        let(:params) { { priority_number: 3 } }
        it { is_expected.to include('Priority number is not included in the list') }
      end
    end
  end

  describe '検索' do
    subject {
      create_tasks
      Task.search(user.id, params).pluck(:id).to_set
    }
    let(:create_tasks) {
      [
        { id: 0, title: 'AAAAA', description: 'XXXXX', done_id: -1 },
        { id: 1, title: 'BBBBB', description: 'XXXXX', done_id: 0 },
        { id: 2, title: 'CCCCC', description: 'XXAAX', done_id: 1 },
        { id: 3, title: 'AABCC', description: 'XXXXX', done_id: 1 },
        { id: 4, title: 'CCBAA', description: 'XXXXX', done_id: -1 }
      ].each do |args|
        FactoryBot.create(:task, user_id: user.id, **args)
      end
    }
    let(:user) { FactoryBot.create(:user) }

    describe 'タイトル・内容両方のキーワード検索' do
      let(:params) { { word: 'AA', target: 'all' } }
      it { is_expected.to eq Set[0, 2, 3, 4] }
    end

    describe 'タイトルのキーワード検索' do
      let(:params) { { word: 'AA', target: 'title' } }
      it { is_expected.to eq Set[0, 3, 4] }
    end

    describe '内容のキーワード検索' do
      let(:params) { { word: 'AA', target: 'description' } }
      it { is_expected.to eq Set[2] }
    end

    describe 'ステータス未着手の検索' do
      let(:params) { { done_ids: [-1] } }
      it { is_expected.to eq Set[0, 4] }
    end

    describe 'ステータス着手の検索' do
      let(:params) { { done_ids: [0] } }
      it { is_expected.to eq Set[1] }
    end

    describe 'ステータス完了の検索' do
      let(:params) { { done_ids: [1] } }
      it { is_expected.to eq Set[2, 3] }
    end

    describe '複数のステータスの検索' do
      let(:params) { { done_ids: [-1, 0] } }
      it { is_expected.to eq Set[0, 1, 4] }
    end
  end
end
