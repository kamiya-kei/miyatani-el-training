class User < ApplicationRecord
  before_destroy :admin_check
  before_update :admin_check, if: :admin_check_required?

  # 課題の指定の為、deviseを使用していません
  attr_accessor :password, :password_confirmation

  after_validation :set_encrypted_password

  has_many :tasks, dependent: :destroy
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :role

  validates :name, presence: true, uniqueness: true
  validates :password, presence: true, on: :create
  validates :password, length: { in: 6..128 },
                       format: { # 半角英数両方とも含む必要がある
                         with: /\A(?=.*?[a-z])(?=.*?\d)[a-z\d]+\z/i,
                         message: 'is invalid. Include both letters and numbers'
                       },
                       confirmation: true,
                       if: :password_validation?
  validates :role_id, inclusion: { in: Role.pluck(:id) }

  def password_validation?
    self.password.present?
  end

  def self.search(name, password)
    user = User.find_by(name: name)
    return unless user.present? && user.compare_password(password)

    user
  end

  def compare_password(secret)
    new_encrypted_password = BCrypt::Password.new(self.encrypted_password)
    self.encrypted_password = new_encrypted_password # 比較の度にハッシュ値を更新
    self.encrypted_password == BCrypt::Engine.hash_secret(secret, new_encrypted_password.salt)
  end

  private

  def set_encrypted_password
    self.encrypted_password = BCrypt::Password.create(password)
  end

  def admin_check_required?
    # 管理ユーザーから一般ユーザーへの変更か
    self.role_id_was == Role::ADMIN && self.role_id == Role::REGULAR
  end

  def admin_check
    # 変更・削除しようとしているユーザー以外に管理ユーザーがいなければエラー
    unless User.where.not(id: self.id)
        .where(role_id: Role::ADMIN)
        .exists?
      throw(:abort)
    end
  end
end
