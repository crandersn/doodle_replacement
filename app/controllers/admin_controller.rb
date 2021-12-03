class AdminController < ApplicationController

  def homepage
    @test = params[:test]
    @current_user = current_admin.email
    @not_started_polls = Poll.where("status = 'Not Started' AND admin_id=" + current_admin.id.to_s)
    @active_polls = Poll.where("status = 'Active' AND admin_id=" + current_admin.id.to_s)
    @finished_polls = Poll.where("status = 'Finished' AND admin_id=" + current_admin.id.to_s)
  end

  def start

    id = params["start_poll"]

    poll_started = Poll.find(id)
    poll_started.status = 'Active'
    poll_started.save!

    redirect_to admin_root_path

  end

  def end

    id = params["end_poll"]

    poll_ended = Poll.find(id)
    poll_ended.status = 'Finished'
    poll_ended.save!

    redirect_to admin_root_path

  end

  def delete

    id = params["delete_poll"]

    poll_deleted = Poll.find(id)
    poll_deleted.destroy

    redirect_to admin_root_path

  end

  def new

    redirect_to poll_new_url

  end

  def edit
    poll_edited = params["edit_poll"]
    redirect_to poll_edit_url(:id => poll_edited)
  end

  def invite
    id = params["poll_invite"]
    @poll = Poll.find(id)
    @invitees = Invitee.where("poll_id = " + id)
    # redirect_to admin_invite_url
  end

  def delete_invitee

    id = params["delete_invitee"]
    poll = Invitee.find(id).poll_id

    invitee_deleted = Invitee.find(id)
    invitee_deleted.destroy

    redirect_to admin_invite_url(:poll_invite => poll)

  end

  def add_invitee

    id = flash[:poll_id]

    Invitee.create!(name: params[:name], phone_number: params[:phone_number], poll_id: id)
    redirect_to admin_invite_url(:poll_invite => id)


  end

  def send_invites

    # test
    id = flash[:poll_id]
    @invitees = Invitee.where("poll_id = " + id.to_s)

    poll = Poll.find(id)

    account_sid = ENV['ACCOUNT_SID']
    auth_token = ENV['AUTH_TOKEN']

    @client = Twilio::REST::Client.new(account_sid, auth_token)

    @invitees.each do |invitee|

      begin
      message_body = 'Hello ' + invitee.name + '! You are invited to vote on this poll: ' + poll.poll_name + ' @ '
      message = @client.messages.create(
        from: '+15052278737',
        body: message_body,
        to: invitee.phone_number
      )

      puts message.sid

      rescue
        x=1
      end

    end

    redirect_to admin_root_url

  end



end