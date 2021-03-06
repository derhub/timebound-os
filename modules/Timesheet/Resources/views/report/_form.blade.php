<div id="reports-filter">
{!! Form::open(['route' => $url, 'method' => 'get', 'id' => 'filter-group']) !!}
	
	<div class="form-group col-sm-12">
		<div id="reportrange" class="pull-left">
		    <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>&nbsp;
		    <span></span> <b class="caret"></b>
		</div>

	    {!! Form::text('start', $request->input('start'), ['class' => 'hide']) !!}
	    {!! Form::text('end', $request->input('end'), ['class' => 'hide']) !!}

	    @if (\Entrust::hasRole('admin'))
	    {!! Form::select('user_id', $users, $request->input('user_id'), []) !!}
	    @endif

	    {!! Form::select('project_id', $projects, $request->input('project_id'), []) !!}

	    {!! Form::select('client_id', $clients, $request->input('client_id'), []) !!}

	    {!! Form::submit('Filter', ['class' => 'btn btn-default btn-primary']) !!}
	</div>

{!! Form::close() !!}
</div>